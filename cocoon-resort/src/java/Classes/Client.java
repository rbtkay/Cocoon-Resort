/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;

/**
 *
 * @author Robert
 */
public class Client {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public boolean create(String name, String password, String phone, String email) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("insert into clients_t (client_name, client_password, client_phone, client_email) values (?,?,?,?)");

            prepStmt.setString(1, name);
            prepStmt.setString(2, password);
            prepStmt.setString(3, phone);
            prepStmt.setString(4, email);

            prepStmt.executeUpdate();

            Email confirmEmail = new Email();
            confirmEmail.send("verify", email, 0, 0, 0);

            return true;
        } catch (Exception e) {
            return false;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                out.println("Error while Closing to the Connection " + e);
            }
        }
    }

    public JsonArray login(String email, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("select * from clients_t where client_email = ? and client_password = ?");

            System.out.println("email");
            System.out.println(email);
            System.out.println("password");
            System.out.println(password);

            prepStmt.setString(1, email);
            prepStmt.setString(2, password);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

//            JWT jwtClass = new JWT();
//            String jwt = "";
//            System.out.print(jwt);
            while (result.next()) {
                int id = result.getInt("client_id");
                String emailResult = result.getString("client_email");
//                jwt = jwtClass.createJWT(id, email, "client");

                builder.add(Json.createObjectBuilder()
                        //                        .add("jwt", jwt)
                        .add("id", id)
                        .add("email", emailResult)
                        .add("name", result.getString("client_name")));
            }

            JsonArray resultJson = builder.build();
            if (resultJson.isEmpty()) {
                return null;
            } else {
                return resultJson;
            }

        } catch (Exception e) {

            try {
                throw e;
            } catch (Exception err) {
                System.out.print(e);
            }
            return null;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                out.println("Error while Closing to the Database");
            }
        }
    }

    public boolean delete(int id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("delete from clients_t where client_id = ?");

            prepStmt.setInt(1, id);
            prepStmt.executeUpdate();
            return true;
        } catch (Exception e) {
            return false;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                out.println("Error while Closing to the Database");
            }
        }
    }

    public boolean exists(String email) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("select client_email from clients_t where client_email = ?");
            prepStmt.setString(1, email);

            result = prepStmt.executeQuery();
            if (result.first()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.println(ex);
            }
        }
        return false;
    }

    public boolean resetPassword(String email, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("update clients_t set client_password = ? where client_email = ?");
            prepStmt.setString(1, password);
            prepStmt.setString(2, email);

            prepStmt.executeUpdate();
            return true;
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.println(ex);
            }
        }
        return false;
    }

    public boolean verifyClient(String token) {
        JWT jwtClass = new JWT();

        String email = jwtClass.decodeURL(token);

        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            System.out.print("verify CLient");

            prepStmt = con.prepareStatement("update clients_t set client_isVerified = 1 where client_email = ?");
            prepStmt.setString(1, email);

            prepStmt.executeUpdate();
            con.close();
            return true;
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return false;
    }

    public JsonArray fetchOne(int id) {
        JsonArray resultJson = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select * from clients_t where client_id = ?");
            prepStmt.setInt(1, id);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

            while (result.next()) {
                String password = result.getString("client_password");
                String phone = result.getString("client_phone");

                builder.add(Json.createObjectBuilder()
                        .add("password", password)
                        .add("phone", phone));
            }
            con.close();
            resultJson = builder.build();
            if (resultJson.isEmpty()) {
                System.out.println("result json is empty");
                return null;
            }
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return resultJson;
    }

    public String[] getId(String email) {
        JsonArray resultJson = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select client_id, client_name from clients_t where client_email = ?");
            prepStmt.setString(1, email);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();
            String id = "";
            String name = "";
            while (result.next()) {
                id = result.getString("client_id");
                name = result.getString("client_name");
//                builder.add(Json.createObjectBuilder()
//                        .add("password", password)
//                        .add("phone", phone));
            }

            String[] info = new String[2];
            info[0] = id;
            info[1] = name;
            con.close();

            return info;

//            resultJson = builder.build();
//            if (resultJson.isEmpty()) {
//                return null;
//            }
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return null;
//        return resultJson;
    }
  
    public boolean update(int id, String password, String phone) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            
            prepStmt = con.prepareStatement("update clients_t set client_password = ?, client_phone = ? where client_id = ?");
            prepStmt.setString(1, password);
            prepStmt.setString(2, phone);
            prepStmt.setInt(3, id);
            
            prepStmt.executeUpdate();
            con.close();
            return true;
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return false;
    }
}
