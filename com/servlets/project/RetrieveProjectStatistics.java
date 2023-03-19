package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.project.RetrieveProject;

public class RetrieveProjectStatistics extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Connection con = (Connection) getServletContext().getAttribute("Connection");
            response.getWriter().println(new RetrieveProject().retrieveProjectStatistics(con, Integer.parseInt(request.getParameter("projectId"))));
        } 
        catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An error Occurred"));
        }
    }   
}