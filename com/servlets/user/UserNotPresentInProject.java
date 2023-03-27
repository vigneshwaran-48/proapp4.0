package com.servlets.user;

import java.io.IOException;
import java.sql.Connection;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.databases.users.RetrieveUser;
import com.mysql.cj.xdevapi.JsonArray;
@MultipartConfig
public class UserNotPresentInProject extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        // super.doPost(req, resp);
        try {
            Connection con = (Connection) req.getServletContext().getAttribute("Connection");
            String queryString = req.getParameter("queryString");
            JSONArray jsonArray = new RetrieveUser().usersNotPresentInProject(con, Integer.parseInt(req.getParameter("projectId")));
            
            System.out.println("jsonarray:"+jsonArray);
            JSONArray jarray=new JSONArray();
            
            jsonArray.stream().filter(elem -> {
                return !queryString.equals("") && ((String)((JSONObject)elem).get("userName")).toLowerCase().contains(queryString.toLowerCase());
            }).forEach(elem-> jarray.add(elem));
            System.out.println("jarray:"+jarray);   
            resp.getWriter().println(jarray.toJSONString());
        } catch (Exception e) {
            // TODO: handle exception
        }
    }
}
