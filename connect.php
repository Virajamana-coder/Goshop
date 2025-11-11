<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    // Validate inputs
    if(empty($username) || empty($email) || empty($password)) {
        echo "<script>alert('All fields are required!'); window.history.back();</script>";
        exit();
    }
    
    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'Goshop');
    
    // Check connection
    if($conn->connect_error) {
        die('Connection Failed: ' . $conn->connect_error);
    }
    
    // Check if email already exists
    $check_stmt = $conn->prepare("SELECT email FROM registration WHERE email = ?");
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if($check_stmt->num_rows > 0) {
        echo "<script>alert('Email already registered!'); window.history.back();</script>";
        $check_stmt->close();
        $conn->close();
        exit();
    }
    $check_stmt->close();
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Prepare and execute insert
    $stmt = $conn->prepare("INSERT INTO registration(username, email, password) VALUES(?, ?, ?)");
    
    if($stmt === false) {
        die('Prepare failed: ' . $conn->error);
    }
    
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if($stmt->execute()) {
        echo "<script>alert('Registration Successful!'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Error: " . $stmt->error . "'); window.history.back();</script>";
    }
    
    $stmt->close();
    $conn->close();
    
} else {
    header("Location: index.html");
    exit();
}
?>