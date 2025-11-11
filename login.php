<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    
    if(empty($username) || empty($password)) {
        echo "<script>alert('All fields are required!'); window.history.back();</script>";
        exit();
    }
    
    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'Goshop');
    
    if($conn->connect_error) {
        die('Connection Failed: ' . $conn->connect_error);
    }
    
    // Get user data
    $stmt = $conn->prepare("SELECT id, username, password FROM registration WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if(password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            echo "<script>alert('Login Successful! Welcome " . $user['username'] . "'); window.location.href='dashboard.php';</script>";
        } else {
            echo "<script>alert('Invalid password!'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('User not found!'); window.history.back();</script>";
    }
    
    $stmt->close();
    $conn->close();
    
} else {
    header("Location: index.html");
    exit();
}
?>
```

## File Structure
```
C:\xampp\htdocs\goshop\
    ├── index.html
    ├── style.css
    ├── connect.php
    └── login.php