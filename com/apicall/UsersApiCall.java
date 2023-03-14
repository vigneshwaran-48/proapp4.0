package com.apicall;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.databases.users.RetrieveUser;

public class UsersApiCall {
    public JSONObject getUserByUserId(int value,Long uid) {
        JSONObject jsonObject = null;
        try {
            URL url = new URL("http://localhost:8787/ProApp/user/getusers?uid="+uid+"id= + value");// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpUrlConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpUrlConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            } else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                jsonObject = (JSONObject) new JSONParser().parse(String.valueOf(sb));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }

    public JSONArray getAllUsers(Long uid) {
        JSONArray jsonArray = null;
        try {
            URL url = new URL("http://localhost:8787/ProApp/user/getusers?uid="+uid+"id=all");// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpUrlConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpUrlConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            } else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                jsonArray = (JSONArray) new JSONParser().parse(String.valueOf(sb));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    public ArrayList<Long> getUsersByProjectId(Long pid,Long uid) {
        ArrayList<Long> userArray = new ArrayList<>();
        try {
            URL url = new URL("http://localhost:8787/ProApp/user/getusers/project?uid="+uid+"id="+ pid);// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpUrlConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpUrlConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            }
            else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                JSONArray jsonArray = (JSONArray) new JSONParser().parse(String.valueOf(sb));
                
                for (Object obj : jsonArray) {
                    JSONObject jsonObject = (JSONObject) obj;
                    userArray.add(Long.parseUnsignedLong(String.valueOf(jsonObject.get("userId"))));
                }
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return userArray;
    }

    public ArrayList<Long> getUsersByTaskId(Long tid,Long uid) {
        ArrayList<Long> userArray = new ArrayList<>();
        try {
            URL url = new URL("http://localhost:8787/ProApp/user/getusers/task?uid="+uid+ "&id=" + tid);// url of the api
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();// opening the url connection using
                                                                                    // the HttpUrlConnection class
            connection.setRequestMethod("GET");// setting the request method as GET
            connection.setRequestProperty("ApiKey",new RetrieveUser().getUserApiKey(Integer.parseInt(String.valueOf(uid))));
            connection.connect();// connection the HttpUrlConnection object
            int responseCode = connection.getResponseCode();// getting the response code to check
            if (responseCode != 200) {// if the status code not equal to 200 throws a exception
                throw new RuntimeException("ResponseCode = " + responseCode);
            }
            else {
                StringBuilder sb = new StringBuilder();
                Scanner sc = new Scanner(url.openStream());

                while (sc.hasNext()) {
                    sb.append(sc.nextLine());
                }
                sc.close();
                JSONArray jsonArray = (JSONArray) new JSONParser().parse(String.valueOf(sb));
                
                for (Object obj : jsonArray) {
                    JSONObject jsonObject = (JSONObject) obj;
                    userArray.add(Long.parseUnsignedLong(String.valueOf(jsonObject.get("userId"))));
                }
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
        return userArray;
    }
    
}
