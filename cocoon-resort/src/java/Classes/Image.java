/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author user
 */
public class Image {

    Connection con;
    PreparedStatement prepStmt;
    ResultSet result;
    PrintWriter out;

    public boolean insertImage(int packId, String imageName, String imagePath) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("insert into images_t (package_id, image_name, image_path) "
                    + "values (?, ?, ?)");
            prepStmt.setInt(1, packId);
            prepStmt.setString(2, imageName);
            prepStmt.setString(3, imagePath);

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

    public ArrayList<String> getImages(int packId) {
        ArrayList<String> returnString = new ArrayList<>();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");

            prepStmt = con.prepareStatement("select image_name from images_t where package_id = ?");
            prepStmt.setInt(1, packId);

            result = prepStmt.executeQuery();
            while (result.next()) {
                System.out.println("DE IMAGE PATH = " + result.getString("image_name"));
                returnString.add(result.getString("image_name"));
            }
            return returnString;
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                System.out.println(ex);
            }
        }
        return returnString;
    }
}
