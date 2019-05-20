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
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;

/**
 *
 * @author Robert
 */
public class Reservation {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public boolean create(int packId, int clientId, int resortId, int quantity) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("insert into reservations_t (package_id, client_id, resort_id, quantity) values (?,?,?,?)");

            prepStmt.setInt(1, packId);
            prepStmt.setInt(2, clientId);
            prepStmt.setInt(3, resortId);
            prepStmt.setInt(4, quantity);

            prepStmt.executeUpdate();
            Package pack = new Package();
            if (pack.updateGuest(packId, quantity)) {
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            try {
                System.out.print("Error while throwing! " + e);
                return false;
            } catch (Exception err) {
                System.out.print("Error while throwing! " + err);
            }
        }
        return false;
    }

    public JsonArray readAll() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("select reservations_t.*, clients_t.client_name, packages_t.package_name, resorts_t.resort_name "
                    + "from reservations_t, clients_t, packages_t,resorts_t "
                    + "where reservations_t.client_id = clients_t.client_id and reservations_t.package_id = packages_t.package_id and resorts_t.resort_id = reservations_t.resort_id");

            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("reservation", Json.createObjectBuilder()
                                .add("from", result.getString("reservation_from"))
                                .add("to", result.getString("reservation_to")))
                        .add("client", result.getString("client_name"))
                        .add("package", result.getString("package_name"))
                );
            }

            JsonArray resultJson = builder.build();

            return resultJson;
        } catch (Exception e) {
            try {
                System.out.print("Error while throwing! " + e);
            } catch (Exception err) {
                System.out.print("Error while throwing! " + err);
            }
        }
        return null;
    }
}
