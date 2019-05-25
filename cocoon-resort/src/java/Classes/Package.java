/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;

/**
 *
 * @author Robert
 */
public class Package {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public JsonArray filterByDate(String start, String end) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("SELECT packages_t.*, resorts_t.resort_id, resorts_t.resort_name, resorts_t.resort_location, resorts_t.resort_category "
                    + "from packages_t, resorts_t "
                    + "where packages_t.package_id not in"
                    + "(select packages_t.package_id from packages_t where ((packages_t.package_from > ?) OR (packages_t.package_to < ?))) "
                    + "and packages_t.resort_id = resorts_t.resort_id");

            prepStmt.setString(1, end);
            prepStmt.setString(2, start);

            result = prepStmt.executeQuery();

            System.out.print("result");

            JsonArrayBuilder builder = Json.createArrayBuilder();
//
//            ResultSetMetaData resultMeta = result.getMetaData();
//            int columns = resultMeta.getColumnCount();
//            ArrayList list = new ArrayList(50);
            while (result.next()) {
//

                System.out.print("new Roound");
                System.out.print(result.getString("package_id"));
                System.out.print(result.getString("resort_name"));
                System.out.print(result.getString("package_detail"));
                System.out.print(result.getString("package_price"));
                System.out.print(result.getString("package_from"));
                System.out.print(result.getString("package_capacity"));
                System.out.print(result.getString("package_isReserved"));
//                System.out.print(result.getString("package_image"));
                System.out.print(result.getString("resort_name"));
                System.out.print(result.getString("resort_location"));
                System.out.print(result.getString("resort_category"));
//                System.out.print(result.getString(["package_"]));
                builder.add(Json.createObjectBuilder()
                        .add("name", result.getString("package_name"))
                        .add("id", result.getString("package_id"))
                        .add("details", result.getString("package_detail"))
                        .add("price", result.getString("package_price"))
                        .add("from", result.getString("package_from"))
                        .add("to", result.getString("package_to"))
                        .add("capacity", result.getString("package_capacity"))
                        //                        .add("image", result.getString("package_image"))
                        .add("isReserved", result.getString("package_isReserved"))
                        .add("resortId", result.getString("resort_id"))
                        .add("resortName", result.getString("resort_name"))
                        .add("location", result.getString("resort_location"))
                        .add("category", result.getString("resort_category"))
                );
            }
            JsonArray resultJson = builder.build();
//
            System.out.print(resultJson);
            if (resultJson.isEmpty()) {
                return null;
            } else {
                return resultJson;
            }
//            return null;

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

            prepStmt = con.prepareStatement("Delete from packages_t where package_id = ?");

            prepStmt.setInt(1, id);

            return true;

        } catch (Exception e) {
            System.out.print(e);
            return false;
        }
    }

    public JsonArray readAll(String filter) {

        System.out.print("in the package class");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            if (filter.isEmpty()) {
                prepStmt = con.prepareStatement(
                        "SELECT packages_t.*, resorts_t.resort_name, resorts_t.resort_location, resorts_t.resort_category "
                        + "FROM packages_t, resorts_t "
                        + "where resorts_t.resort_id = packages_t.resort_id");

            } else {
                System.out.print(filter);
                prepStmt = con.prepareStatement("SELECT packages_t.*, resorts_t.resort_name, resorts_t.resort_location, resorts_t.resort_category "
                        + "FROM packages_t, resorts_t "
                        + "WHERE packages_t.resort_id "
                        + "in (select resorts_t.resort_id from resorts_t where resorts_t.resort_category = ?)");
                prepStmt.setString(1, filter);
            }

            result = prepStmt.executeQuery();

            System.out.print("result");
            System.out.print(result);

            JsonArrayBuilder builder = Json.createArrayBuilder();

            ResultSetMetaData resultMeta = result.getMetaData();
            int columns = resultMeta.getColumnCount();
            ArrayList list = new ArrayList(50);
            while (result.next()) {

                builder.add(Json.createObjectBuilder()
                        .add(result.getString("package_name"), Json.createObjectBuilder()
                                .add("pName", result.getString("resort_name"))
                                .add("pDetail", result.getString("package_detail"))
                                .add("pPrice", result.getString("package_price"))
                                .add("pFrom", result.getString("package_from"))
                                .add("pTo", result.getString("package_to"))
                                .add("pCapacity", result.getString("package_capacity"))
                                .add("pImage", result.getString("package_image"))
                                .add("pReserved", result.getString("package_isReserved"))
                                .add("rName", result.getString("resort_name"))
                                .add("rLocation", result.getString("resort_location"))
                                .add("rCategory", result.getString("resort_category"))
                        )
                );
            }

            JsonArray resultJson = builder.build();

            System.out.print(resultJson);
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

    public boolean createPack(String name, int resortId, String details, int price, String from, String to, int capacity) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("insert into packages_t "
                    + "(package_name, resort_id, package_detail, package_price, package_from, package_to, package_capacity) "
                    + "values (?,?,?,?,?,?,?)");

            prepStmt.setString(1, name);
            prepStmt.setInt(2, resortId);
            prepStmt.setString(3, details);
            prepStmt.setInt(4, price);
            prepStmt.setString(5, from);
            prepStmt.setString(6, to);
            prepStmt.setInt(7, capacity);
//            prepStmt.setString(8, image);

            System.out.print("in the class");
            System.out.print(name);

            prepStmt.executeUpdate();

            return true;

        } catch (Exception e) {
            try {
                throw e;
            } catch (Exception error) {
                System.out.print(error);
            }
        } finally {
            try {
                con.close();
            } catch (Exception err) {
                out.println("Error while Closing to the Database");
            }
        }

        return false;
    }

    public JsonArray readByResortID(int id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select * from packages_t where packages_t.resort_id = ?");
            prepStmt.setInt(1, id);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("id", String.valueOf(result.getInt("package_id")))
                        .add("name", result.getString("package_name"))
                        .add("details", result.getString("package_detail"))
                        .add("price", result.getString("package_price"))
                        .add("from", result.getString("package_from"))
                        .add("to", result.getString("package_to"))
                        //                        .add("image", result.getString("package_image"))
                        .add("capacity", result.getString("package_capacity"))
                        .add("isReserved", result.getBoolean("package_isReserved")));
            }

            JsonArray resultJson = builder.build();
            if (resultJson.isEmpty()) {
                return null;
            } else {
                System.out.print(resultJson);
                return resultJson;
            }
        } catch (Exception ex) {
            System.out.print(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.print(ex);
            }
        }
        return null;
    }

    public boolean updatePack(int id, String name, String details, int price, String from, String to, int capacity) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("update packages_t set package_name = ?, package_detail = ?, package_price = ?, "
                    + "package_from = ?, package_to = ?, package_capacity = ? where package_id = ?");

            prepStmt.setString(1, name);
            prepStmt.setString(2, details);
            prepStmt.setInt(3, price);
            prepStmt.setString(4, from);
            prepStmt.setString(5, to);
            prepStmt.setInt(6, capacity);
            prepStmt.setInt(7, id);

            System.out.println(id);
            System.out.println(name);
            System.out.println(details);
            System.out.println(price);
            System.out.println(from);
            System.out.println(to);
            System.out.println(capacity);

            prepStmt.executeUpdate();
            return true;
        } catch (Exception ex) {
            System.out.print(ex);
            return false;
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.print("Error while closing con" + ex);
            }
        }
    }

    public JsonArray readOne(int id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select packages_t.*, resorts_t.resort_name, resorts_t.resort_location from packages_t, resorts_t where packages_t.package_id = ? and packages_t.resort_id = resorts_t.resort_id");
            prepStmt.setInt(1, id);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("id", String.valueOf(result.getInt("package_id")))
                        .add("name", result.getString("package_name"))
                        .add("resortId", result.getString("resort_id"))
                        .add("resortName", result.getString("resort_name"))
                        .add("details", result.getString("package_detail"))
                        .add("price", result.getString("package_price"))
                        .add("location", result.getString("resort_location"))
                        .add("from", result.getString("package_from"))
                        .add("to", result.getString("package_to"))
                        //                        .add("image", result.getString("package_image"))
                        .add("guests", result.getString("package_guest"))
                        .add("capacity", result.getString("package_capacity"))
                        .add("isReserved", result.getBoolean("package_isReserved")));
            }

            JsonArray resultJson = builder.build();
            if (resultJson.isEmpty()) {
                return null;
            } else {
                System.out.print(resultJson);
                return resultJson;
            }
        } catch (Exception ex) {
            System.out.print(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.print(ex);
            }
        }
        return null;
    }

    public boolean updateGuest(String type, int packId, int guests) { //type is either decrement or increment
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            if (type.equals("increment")) {
                prepStmt = con.prepareStatement("update packages_t set package_guest = (package_guest + ?) where package_id = ?");
            } else if (type.equals("decrement")) {
                prepStmt = con.prepareStatement("update packages_t set package_guest = (package_guest - ?) where package_id = ?");
            }
            prepStmt.setInt(1, guests);
            prepStmt.setInt(2, packId);

            prepStmt.executeUpdate();
            return true;
        } catch (Exception ex) {
            System.out.print(ex);
            return false;
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.print("Error while closing con" + ex);
            }
        }
//        update packages_t set package_guest = ((select package_guest from packages_t where package_id = 3) + 2) where package_id = 3
    }
}
