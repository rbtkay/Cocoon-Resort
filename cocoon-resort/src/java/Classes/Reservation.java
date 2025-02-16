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
            if (pack.updateGuest("increment", packId, quantity)) {
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

    public JsonArray readAllByResort(int id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("select reservations_t.*, clients_t.client_name, packages_t.package_name, resorts_t.resort_name "
                    + "from reservations_t, clients_t, packages_t,resorts_t "
                    + "where reservations_t.client_id = clients_t.client_id and reservations_t.package_id = packages_t.package_id and reservations_t.resort_id = ? and resorts_t.resort_id = reservations_t.resort_id");

            prepStmt.setInt(1, id);
            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("client", result.getString("client_name"))
                        .add("package", result.getString("package_name"))
                        .add("quantity", result.getString("quantity"))
                );
            }

            JsonArray resultJson = builder.build();
            System.out.println(resultJson);
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

    public JsonArray getReservationByCustomer(int id) {
        try {

            System.out.print("id");
            System.out.print(id);
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("select reservations_t.*, clients_t.client_name, packages_t.*, resorts_t.resort_name, resorts_t.resort_location from reservations_t, clients_t, packages_t,resorts_t"
                    + " where reservations_t.client_id = clients_t.client_id "
                    + "and reservations_t.package_id = packages_t.package_id "
                    + "and resorts_t.resort_id = reservations_t.resort_id "
                    + "and reservations_t.client_id = ?");

            prepStmt.setInt(1, id);
            result = prepStmt.executeQuery();

            JsonArrayBuilder builder = Json.createArrayBuilder();
            while (result.next()) {
                builder.add(Json.createObjectBuilder()
                        .add("reservationId", result.getInt("reservation_id"))
                        .add("packId", result.getInt("package_id"))
                        .add("clientName", result.getString("client_name"))
                        .add("packName", result.getString("package_name"))
                        .add("resortId", result.getInt("resort_id"))
                        .add("packDetails", result.getString("package_detail"))
                        .add("packPrice", result.getInt("package_price"))
                        .add("packFrom", result.getString("package_from"))
                        .add("packTo", result.getString("package_to"))
                        .add("packGuests", result.getString("package_guest"))
                        .add("resortName", result.getString("resort_name"))
                        .add("resortLocation", result.getString("resort_location"))
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

    public boolean cancel(int id, int packId, int quantity) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("Delete from reservations_t where reservations_t.reservation_id = ?");

            prepStmt.setInt(1, id);

            prepStmt.executeUpdate();

            Package pack = new Package();
            if (pack.updateGuest("decrement", packId, quantity)) {
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
}
