package Classes;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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
    
    public boolean create(String name, String password, String location) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            prepStmt = con.prepareStatement("insert into resorts_t (resort_name, resort_password, resort_location) values (?,?,?)");
            
            prepStmt.setString(1, name);
            prepStmt.setString(2, password);
            prepStmt.setString(3, location);
            
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
    
    public boolean login(String name, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/resort", "root", "");
            
            System.out.print("in the class");
            prepStmt = con.prepareStatement("select * from resorts_t where resort_name = ? and resort_password = ?");
            
            prepStmt.setString(1, name);
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
                out.println("Error while Closing the Connection " + e);
            }
        }
    }
}
