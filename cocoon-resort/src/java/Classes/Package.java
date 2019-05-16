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
import java.util.ArrayList;
import java.util.HashMap;
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

            if (filter == null) {
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
//
//                return list;
//                builder.add(Json.createObjectBuilder()
//                        .add("email", result.)
//                        .add("email", result.getString("client_email"))
//                        .add("email", result.getString("client_email"))
//                        .add("email", result.getString("client_email"))
//                        .add("name", result.getString("client_name")));
//            }
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
