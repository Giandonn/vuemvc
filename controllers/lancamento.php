<?php

class Lancamento extends Controller
{

    function __construct()
    {
        parent::__construct();
        Auth::autentica();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Lançamento";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/lancamento/app.vue.js");
        array_push($this->view->css, "views/lancamento/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function teste()
    {
        $this->model->teste();
    }

    function insertLanc()
    {
        $this->model->insertLanc();
    }

    function showLanc()
    {
        $this->model->showLanc();
    }

    function getDados()
    {
        $this->model->getDados();
    }

    function editLanc()
    {
        $this->model->editLanc();
    }

    function delLanc()
    {
        $this->model->delLanc();
    }

    function newLanc()
    {
        $this->model->newLanc();
    }
}