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
    /*
        Cliente = {
            id: identifier
            nome: 'nome',
            pets: ['pet1', 'pet2'],
            fidelizado: true or false
        }
    */    
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
    /*
    animal = {
        id: identifier,
        nome: 'nome',
        dono: 'dono',
        consultas: ['consulta1', 'consulta2']
    }
    */
    #id;

    constructor (idC, nomePetC, donoC, consultasC) {
        this.#id       = idC;
        this.nomePet   = nomePetC;
        this.donoC     = donoC;
        this.consultas = consultasC;
    }
}

class Consulta {
    /*
        consulta = {
            id: identifier,
            nomeCliente: 'nome',
            nomePet: 'nome',
            nomeFuncionario: 'nome',
            status: 'status',
            data: [dia, mes, ano] 
        }
    */
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
        this.clientes        = "";
        this.consultas       
    }
    mostrarDados () {

        console.log("---------- MOSTRAR DADOS ----------");
        // Funcionario = {id: identification, nome: "Nome", senha: "senha", clientes: {"nome": ["pet1", "pet2", ...]}}
        let clientes = this.clientes.keys();
        let pets     = this.clientes.values();

        console.log(`Nome:     ${this.nomeFuncionario}`);
        console.log(`Senha:    ${this.#senha}`);
        console.log(`Clientes: ${clientes}`);
        console.log(`Animais:  ${pets}`);
    }
    get id () {
        return this.id;
    }
    modificarDados () {
        
        let valido = false;
        while (!valido) {
            console.clear();
            console.log("---------- MODIFICAR DADOS ----------");
            console.log("Que dados modificar? (1. Nome; 2. Senha)");
            
            let info = prompt(" ~ ");
            info = parseInt(info);

            if (info == NaN || info < 1 || info > 2) {
                console.clear();
                console.log("Entrada inválida, tente novamente.");

            } else if (info == 1) {
                let novoNome = prompt("Insira o novo nome: ");
                this.nomeFuncionario = novoNome;
                valido = true;

            } else if (info == 2) {
                let novaSenha = prompt("Insira a nova senha: ");
                this.senha = novaSenha;
                valido = true;
            }
        }
    }
    verClientes () {
        console.clear();
        console.log("---------- VER DADOS ----------");

        let clientes = this.clientes.keys();
        let quantidade = clientes.length;
        for (let i = 1; i <= quantidade; i++) {
            console.log(`${i}. ${clientes[i]}`);
        }
    }
    verPets () {
        console.clear();
        console.log("---------- VER PETS ----------");

        let pets = this.clientes.values();
        let quantidade = pets.length;
        for (let i = 1; i <= quantidade; i++) {
            console.log(`${i}. ${pets[i]}`);
        }
    }
    verConsultas () {

    }
    mudarStatusConsulta () {

    }
}

class FuncionarioNaoLogado {
    /*
    Métodos: 
        login, 
        cadastro, 
        sair
    */

    #id;

   constructor () {
        this.#id             = "";
        this.nomeFuncionario = "";
        this.senha           = "";
   }
   login (funcionarios) {
        console.clear();
        console.log("---------- LOGIN ----------");
        this.nomeFuncionario = prompt("Insira seu nome: ");
        this.senha           = prompt("Insira sua senha: ");
        
    }
   cadastro () {
        console.clear();
        console.log("---------- CADASTRO ----------");
        this.nomeFuncionario = prompt("Insira seu nome: ");
        this.senha          = prompt("Insira sua senha: ");

        this.#id = uuidv4(); // Criação do id unico e aleatório

        return new [this.#id, this.nomeFuncionario, this.senha];
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

    funcionarios = [];
    #id;

    constructor () {

        this.funcionario; // objeto de funcionario


        valido = false;
        while (!valido) {

            // Inicialização do sistema, começa perguntando o que o funcionário gostaria de fazer.
            console.log("MENU:");
            console.log("1. Cadastro\n2. Logar\n3. Sair");
            
            let opcao = prompt("Digite a opção: ");
            opcao = parseInt(opcao);
            
            if (opcao == NaN || opcao > 3 || opcao < 0) {
                
                console.log("Entrada inválida, tente novamente.");
                console.clear();

            } else {
                valido = true;
                console.clear();
            }

            switch (opcao) {
                case 1:
                    this.funcionario = new FuncionarioNaoLogado();
                    funcionarios.push(funcionario.cadastro());
                case 2:
                    this.funcionario = new FuncionarioNaoLogado();
                    funcionario.login(funcionarios);
                    funcionarios.push(this.funcionario);
                case 3:
                    break;
            }
        }
    }
    menuPrincipal () {
        /*
        Essa função vai interagir com o usuário e determinar
        que tipo de ação ele vai fazer, passando assim para 
        a função da interação propriamente dita.
        */
       valido = false;
       while (!valido) {
            console.clear();
            console.log("---------- MENU PRINCIPAL ----------");
            console.log("1.  Ver meus dados;");
            console.log("2.  Modificar meus dados;");
            console.log("3.  Ver lista de clientes;");
            console.log("4.  Ver lista de pets;");
            console.log("5.  Ver lista de consultas;");
            console.log("6.  Ver lista de funcionários;");
            console.log("7.  Marcar consulta;");
            console.log("8.  Mudar status de consulta;");
            console.log("9.  Remover cliente;");
            console.log("10. Remover pet;");
            console.log("11. Cancelar consulta;");
            console.log("12. Remover funcionário;");
            console.log("13. Fazer logout;\n");

            let opcao = prompt("Insira o número da ação: ");

            opcao = parseInt(opcao);

            if (opcao == NaN || opcao < 1 || opcao > 13) {
                switch (opcao) {
                    case 1:
                        this.mostrarDados();
                        valido = true;
                        break;
                    case 2:

                }
            }
        }
    }



}

let programa = new Sistema();