/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import java.io.PrintWriter;
import java.sql.*;

/**
 *
 * @author user
 */
public class Lib {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public String[] mailInfo(int customer, int resort, int pack) {
        String[] returnArray = new String[8];
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select clients_t.client_email, resorts_t.resort_name, packages_t.package_name, packages_t.package_detail, packages_t.package_price, packages_t.package_from, packages_t.package_to, reservations_t.quantity from clients_t, resorts_t, packages_t, reservations_t where clients_t.client_id = ? and resorts_t.resort_id = ? and packages_t.package_id = ? and reservations_t.client_id = clients_t.client_id");

            prepStmt.setInt(1, customer);
            prepStmt.setInt(2, resort);
            prepStmt.setInt(3, pack);

            result = prepStmt.executeQuery();
            while(result.next()) {
                for (int i = 0; i < returnArray.length; i++) {
                    if (i != 4 || i != 7) {
                        returnArray[i] = result.getString(i + 1);
                    } else {
                        returnArray[i] = String.valueOf(result.getInt(i + 1));
                    }
                }
            }

            System.out.println("returnArray" + returnArray[0]);
        } catch (Exception ex) {
            System.out.print(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.println(ex);
            }
        }
        return returnArray;
    }
    
    public String mailInfo(int id) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            
            prepStmt = con.prepareStatement("select client_email from clients_t where client_id = ?");
            prepStmt.setInt(1, id);
            
            result = prepStmt.executeQuery();
            if (result.first()) {
                return result.getString("client_email");
            } else {
                return "null";
            }
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.print(ex);
            }
        }
        return "null";
    }
}
