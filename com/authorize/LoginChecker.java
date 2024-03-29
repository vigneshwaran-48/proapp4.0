package com.authorize;

import java.sql.*;

/**
 * This class contains method to validate the email and password
 */
public class LoginChecker {
    /**
     * This method is to validate the email and password
     * @param email Used for checking with DB
     * @param password Used for checking with DB
     * @return returns boolean with verification of the email and password
     */
    public boolean validater(String email, String password) {
        // creating a prepare statement
        boolean result = false;
        Connection connection = null;
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/proapp", "root",
                "");
            PreparedStatement ps;
            ResultSet rs;
            String sql = "select emailid,cast( aes_decrypt(password,'secret_key') as char) as password from users";
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                // if ((rs.getString("emailid").equals(email) || rs.getString("uname").equals(email))&& rs.getString("password").equals(password)) {
                //     return true;
                // }
                if (rs.getString("emailid").equals(email) && rs.getString("password").equals(password)) {
                    return true;
                }
            }

        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
        finally {
            if(connection != null){
                try {
                    connection.close();
                } 
                catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

}