package com.servlets.task;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.task.RetrieveTask;

public class GetTasksByPid extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Connection con = (Connection) getServletContext().getAttribute("Connection");
            response.getWriter().println(new RetrieveTask().retreiveTasksByPid(con, Integer.parseInt(request.getParameter("projectId")), Integer.parseInt(request.getParameter("userId"))));
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
