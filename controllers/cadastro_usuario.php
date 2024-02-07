<?php

class Cadastro_Usuario extends Controller
{

    function __construct()
    {
        parent::__construct();
        Auth::haveAccess(1);
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Cadastro De Novos Usuarios";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastro_usuario/app.vue.js");
        array_push($this->view->css, "views/cadastro_usuario/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function insertUsers()
    {
        $this->model->insertUsers();
    }

    function showLvl()
    {
        $this->model->showLvl();
    }
}