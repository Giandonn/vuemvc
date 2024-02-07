<?php
/**
 * 
 */
class Auth
{
    
    public static function autentica()
    {
        @session_start();
        $logado = $_SESSION['logado'];
        if ($logado != true) {
            session_destroy();
            header('Location: login/');
            exit;
        }
    }

    public static function perm($permissao)
    {
        @session_start();
        $nivel = $_SESSION['nivel'];
        if ($permissao != $nivel) {
            session_destroy();
            header('Location: login/');
            exit;
        }
    }

     public static function haveAccess($permissao)
    {
         @session_start();
         $nivel = $_SESSION['nivel'];
         if ($permissao != $nivel) {
             session_destroy();
             header('Location: index/');
             exit;
         }
    }

    public static function accessDenied($permissao)
    {
        @session_start();
        $nivel = $_SESSION['nivel'];
        if ($permissao == $nivel){
            session_destroy();
            header('Location: index/');
            exit;
        }
    }
    
}
