package Classes;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Robert
 */
public class Resort {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public boolean create(String name, String password, String location, String category) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("insert into resorts_t (resort_name, resort_password, resort_location, resort_category) values (?,?,?,?)");

            prepStmt.setString(1, name);
            prepStmt.setString(2, password);
            prepStmt.setString(3, location);
            prepStmt.setString(4, category);

            prepStmt.executeUpdate();

            return true;
        } catch (Exception e) {
            return false;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                out.println("Error while Closing the Connection " + e);
            }
        }
    }

    public JsonArray login(String name, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            System.out.print("in the class" + name);
            prepStmt = con.prepareStatement("select * from resorts_t where resort_name = ? and resort_password = ?");

            prepStmt.setString(1, name);
            prepStmt.setString(2, password);

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

//            if (result.first()) {
            while (result.next()) {
                int id = result.getInt("resort_id");
                String resortName = result.getString("resort_name");

                JWT jwtClass = new JWT();
                String jwt = jwtClass.createJWT(id, resortName, "resort");

//                System.out.println("result.next " + result.getString("resort_name"));
                builder.add(Json.createObjectBuilder()
                        .add("id", id)
                        .add("name", result.getString("resort_name"))
                        .add("image", result.getString("resort_image"))
                        .add("jwt", jwt)
                );
            }
            JsonArray resultJson = builder.build();

            if (resultJson.isEmpty()) {
                return null;
            } else {
                return resultJson;
            }
        } catch (Exception e) {
            return null;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                out.println("Error while Closing the Connection " + e);
            }
        }
    }

    public JsonArray getLocations() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            System.out.print("in the class");
            prepStmt = con.prepareStatement("select distinct resort_location from resorts_t");

//            prepStmt.setString(1, name);
//            prepStmt.setString(2, password);
            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();

//            if (result.first()) {
            while (result.next()) {
                System.out.println("result.next " + result.getString("resort_location"));
                builder.add(Json.createObjectBuilder()
                        .add("text", result.getString("resort_location"))
                        .add("value", result.getString("resort_location"))
                );
            }
            JsonArray resultJson = builder.build();

            if (resultJson.isEmpty()) {
                return null;
            } else {
                return resultJson;
            }
        } catch (Exception e) {
            System.out.print("Error while connecting to the Database" + e);
            return null;
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.print("Error while closing the connection" + e);
            }
        }
    }

    public JsonArray readAll(String filter) {

        System.out.print("in the Resort class");
        System.out.print(filter);

        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            if (filter.isEmpty()) {
                prepStmt = con.prepareStatement("SELECT resorts_t.*, "
                        + "(SELECT COUNT(packages_t.package_id) as COUNT from packages_t where packages_t.resort_id = resorts_t.resort_id)"
                        + " as packCount FROM resorts_t");

            } else {
                System.out.print(filter);
                prepStmt = con.prepareStatement("SELECT resorts_t.*, "
                        + "(SELECT COUNT(packages_t.package_id) as COUNT from packages_t where packages_t.resort_id = resorts_t.resort_id) as packCount "
                        + "FROM resorts_t "
                        + "where resorts_t.resort_category = ?");
                prepStmt.setString(1, filter);
            }

            result = prepStmt.executeQuery();

            System.out.print("result");
            System.out.print(result);

            JsonArrayBuilder builder = Json.createArrayBuilder();

            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("id", result.getString("resort_id"))
                        .add("name", result.getString("resort_name"))
                        .add("location", result.getString("resort_location"))
                        .add("category", result.getString("resort_category"))
                        .add("image", result.getString("resort_image"))
                        .add("count", result.getString("packCount"))
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
}
