<?php

class Login extends Controller
{

    function __construct()
    {
        parent::__construct();
        session_start();
        session_destroy();
        $_SESSION = array();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Login";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/login/app.vue.js");
        array_push($this->view->css, "views/login/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function checkLogin()
    {
        $this->model->checkLogin();
    }
}