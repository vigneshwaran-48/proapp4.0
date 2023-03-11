package com.servlets.notification;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.notification.Notification;

public class DeleteNotification extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con = (Connection) request.getServletContext().getAttribute("Connection");
        int uid = Integer.parseInt(request.getParameter("userId"));
        int nid = Integer.parseInt(request.getParameter("nid"));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("result", new Notification().deleteNotification(con, uid, nid));
        response.getWriter().println(jsonObject);
    }
}