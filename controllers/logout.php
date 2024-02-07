<?php

class Logout extends Controller
{

    function __construct()
    {
        parent::__construct();
    }

    function index()
    {
        $this->model->logout();
        $this->view->title = "Logout";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/Logout/app.vue.js");
        array_push($this->view->css, "views/Logout/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function Logout()
    {
        $this->model->Logout();
    }
}