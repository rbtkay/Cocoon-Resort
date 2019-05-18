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
                                .add("pGuests", result.getString("package_guests"))
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

    public boolean createPack(String name, int resortId, String details, int price, String from, String to, int guests) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("insert into packages_t "
                    + "(package_name, resort_id, package_detail, package_price, package_from, package_to, package_guests) "
                    + "values (?,?,?,?,?,?,?)");
            prepStmt.setString(1, name);
            prepStmt.setInt(2, resortId);
            prepStmt.setString(3, details);
            prepStmt.setInt(4, price);
            prepStmt.setString(5, from);
            prepStmt.setString(6, to);
            prepStmt.setInt(7, guests);

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
    
    public JsonArray readByResortID(int id){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            
            prepStmt = con.prepareStatement("select * from packages_t where packages_t.resort_id = ?");
            prepStmt.setInt(1, id);
            
            result = prepStmt.executeQuery();
            
            JsonArrayBuilder builder = Json.createArrayBuilder();
            
            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                    .add(result.getString("package_name"), Json.createObjectBuilder()
                        .add("Detail", result.getString("package_detail"))
                        .add("Price", result.getString("package_price"))
                        .add("From", result.getString("package_from"))
                        .add("To", result.getString("package_to"))
                        .add("Image", result.getString("package_image"))));
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
}
