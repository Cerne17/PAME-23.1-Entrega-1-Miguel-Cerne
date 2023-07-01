// Roda o programa no modo estrito, o que significa, por exemplo, que o uso de variáveis não declaradas retorna um erro. É uma forma mais segura de escrever código em javascript.
"use strict";

/* ----------------- Importação de módulos ----------------- */

// Possibilita a interação com usuário pelo prompt de comando
const prompt = require("prompt-sync")({sigint : true});
// Usado para a criação de identificadores únicos (outra opção seria a utilização do comando Date.now() para gerar id's, no entando, esses id's não seriam aleatórios, o que poderia vir a ser um problema de segurança)
const { v4 : uuidv4 } = require('uuid');

/* UTILIZAÇÃO : uniqueId = uuidv4(); */

/* --------------------------------------------------------- */

/*

Informações:
    id         : identificação de cada usuário
    nome       : string com o nome do cliente/funcionario/pet
    pets       : lista com o nome dos pets do cliente em questão
    fidelizado : boolean true (nConsultas>=4) ou false
    senha      : string para acesso ao CLI
    status     : string pendente, adiada, realizada, cancelada
    data       : lista com dia/mes/ano da consulta agendada
------------
Fidelização    : 4 ou mais consultas

*/

class Cliente {

    #id;

    constructor (idC, nomeClienteC, petsC, fidelizadoC) {
        this.#id               = idC;
        this.nomeCliente       = nomeClienteC;
        this.pets              = petsC;
        this.fidelizado        = fidelizadoC;
    }

    get cliente () {

    }

}
class Animal {

    #id;

    constructor (idC, nomePetC, donoC, consultasC) {
        this.#id       = idC;
        this.nomePet   = nomePetC;
        this.donoC     = donoC;
        this.consultas = consultasC;
    }
}

class Consulta {

    #id;

    constructor (idC, nomeClienteC, nomePetC, nomeFuncionarioC, statusC, dataC) {
        this.#id             = idC;
        this.nomeCliente     = nomeClienteC;
        this.nomePet         = nomePetC;
        this.nomeFuncionario = nomeFuncionarioC;
        this.status          = statusC;
        this.data            = dataC;
    }
}

class Funcionario {
    /*
    Essa é a estrutura básica de um funcionário, usada em ambos, funcionários logados e funcionários não logados.
    */

    #id;
    #senha;

    constructor (idC, nomeFuncionarioC, senhaC) {
        this.#id             = idC;
        this.nomeFuncionario = nomeFuncionarioC;
        this.#senha          = senhaC;
    }

    get id () {
        return this.id;
    }

    set 
}

class FuncionarioNaoLogado extends Funcionario {
    /*
    Métodos: 
        login, 
        cadastro, 
        sair
    */
   constructor () {

   }
}

class FuncionarioLogado extends Funcionario {
    /*
    Métodos:
        verDados,
        modificarDados,
        verClientes (em ordem alfabética),
        verPets (com os donos e em ordem alfabética hash?),
        verConsultas (ordem cronológica),
        verFuncionarios (em ordem alfabética e não mostrar senhas),
        marcarConsulta (caso exista, remarcar),
        mudarStatusConsulta (pendente, adiada, realizada, cancelada),
        removerCliente (ao remover um cliente, seus pets também devem ser excluídos do sistema),
        cancelarConsulta,
        removerFuncionario (não deve ser possível remover um funcionário que tenha consultas agendadas),
        logout
    */
}

class Sistema {

    constructor () {

    }
}

let programa = new Sistema();