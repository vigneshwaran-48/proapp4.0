package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.project.Project;
@MultipartConfig
public class AddUser extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        // super.doPost(req, resp);
        try {
            JSONObject jsObject=new JSONObject();
            Connection con = (Connection) req.getServletContext().getAttribute("Connection");
            
            jsObject.put("status", new Project().addUserToProject(con, Integer.parseInt(req.getParameter("projectId")),Integer.parseInt(req.getParameter("userId"))));
            resp.getWriter().println(jsObject);
        
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }
}
