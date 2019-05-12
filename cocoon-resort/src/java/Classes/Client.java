/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.*;

/**
 *
 * @author Robert
 */
public class Client {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public boolean create(String name, String password, int phone, String email) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("insert into clients_t (client_name, client_password, client_phone, client_email) values (?,?,?,?)");

            prepStmt.setString(1, name);
            prepStmt.setString(2, password);
            prepStmt.setInt(3, phone);
            prepStmt.setString(4, email);

            prepStmt.executeUpdate();
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

    public boolean login(String email, String password) {
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

            if (result.next()) {
                return true;
            } else {
                return false;
            }
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

    public boolean delete(String email) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("delete from clients_t where client_email = ?");

            prepStmt.setString(1, email);
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

    public boolean logout(String email) {
        return false;
    }

}
