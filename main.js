// Roda o programa no modo estrito, o que significa, por exemplo, que o uso de variáveis não declaradas retorna um erro. É uma forma mais segura de escrever código em javascript.
"use strict";

/* ----------------- Importação de módulos ----------------- */
// Possibilita a interação com usuário pelo prompt de comando
const prompt = require("prompt-sync")({sigint : true}); // interação com usuário no prompt

const { v4 : uuidv4 } = require('uuid'); // usado para criar os id's. Outra opção seria usar Date.now(), mas não teria um id aleatório (podendo se tornar um problema de segurança)

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

    constructor (nomeClienteC, petsC) {
        this.#id               = uuidv4();
        this.nomeCliente       = nomeClienteC; // string
        this.pets              = petsC; // array de objetos
        this.fidelizado        = false;
    }
    
    // Função usada no código para mostrar clientes com seus animais em Funcionario
    mostrarPetsLinha () {

        let pets = [];

        let quantidade = this.pets.length;
        for (let i = 0; i < quantidade; i++) {
            pets.push(this.pets[i].nomePet);
        }

        quantidade = pets.length;

        for (let i = 0; i < quantidade; i++) {
            pets[i] = capitalize(pets[i]);
        }
        pets = pets.sort()

        let text = ``;
        for (let i=0; i<quantidade; i++) {
            if (i==0) {
                text = `${pets[i]}`;
            } else if (i!=0){
                text = `${text}, ${pets[i]}`;
            } else {
                text = `${text}, ${pets[i]}`;
            }
        }

        return text;
    }
    // Função usada no código para mostrar os pets em Funcionario
    mostrarPets () {
        let text = this.mostrarPetsLinha();
        text = `${this.nomeCliente} : ${text}`;
        return text;
    }
    adicionarPet (nomeDono, nomePet) {
        let titulo = "---------- ADICIONAR PET ----------";
        console.clear();
        console.log(titulo);
        this.pets.push(new Animal(nomePet, nomeDono));
        console.clear();
        console.log(titulo);
        console.log(`${nomePet} adicionado à lista de pets de ${this.nomeCliente}`);
    }
    
    removerPet () {
        let titulo = "---------- REMOVER PET ----------";
        console.clear();
        console.log(titulo);

        let quantidade = this.pets.length;
        for (let i = 0; i < quantidade; i++) {
            console.log(`${i+1}. ${this.pets[i].nomePet};`);
        }
        console.log("Insira o indice do pet a ser removido: ");
        let indice = prompt("~ ") 
            
        indice = parseInt(indice);

        if (indice == NaN || indice < 1 || indice > this.pets.length) {
            invalido();
        } else {
            indice--;
            
            console.clear();
            console.log(titulo);

            console.log(`Deseja mesmo remover ${this.pets[indice].nomePet}? (s/n)`);
            let confirmacao = prompt("~ ");

            if (confirmacao == "s") {
                this.pets.splice(indice, 1);
            } else if (confirmacao == "n") {
                console.clear();
                console.log(titulo);
                console.log("Cancelando remoção...")
            } 
            else {
                invalido("Entrada inválida, tente novamente");
            }
        }
    }
}
class Animal {
    /*
    animal = {
        id: identifier,
        nome: 'nome',
        dono: 'dono',
        funcionario: 'nomeFuncionario', (nome do médico)
        consultas: numeroDeConsultas
    }
    */
    #id;

    constructor (nomePetC, donoC) {
        this.#id       = uuidv4();
        this.nomePet   = nomePetC;
        this.donoC     = donoC;
        this.consultas = 0;
    }
}

class Consulta {
    /*
        consulta = {
            id: identifier,
            nomeCliente: 'nome',
            nomePet: 'nome',
            nomeFuncionario: 'nome',
            data: [hora, dia, mes],
            status: 'status'
        }
    */
    #id;

    constructor (nomeClienteC, nomePetsC, nomeFuncionarioC, statusC, dataC) {
        this.#id             = uuidv4();
        this.nomeFuncionario = nomeFuncionarioC;
        this.nomeCliente     = nomeClienteC;
        this.nomePets        = nomePetsC;
        this.data            = dataC;
        this.status          = statusC;
    }
}

class Funcionario {
    /*
    funcionario = {
        id: id,
        nome: 'nome',
        senha: 'senha'
        clientes: [cliente1, cliente2, cliente3,...],

    }
    */

    #id;
    // #senha;

    constructor (nomeFuncionarioC, senhaC) {
        this.#id             = uuidv4();
        this.nomeFuncionario = nomeFuncionarioC;
        this.senha           = senhaC;
        this.clientes        = [];
        this.pets            = {};
        this.consultas       = {}; // data ("mmddhh"): {consulta}
        let quantidadeClientes = this.clientes.length;
        let nomeClientes       = Object.keys(this.clientes);
        for (let i = 0; i < quantidadeClientes; i++) {
            let petsAtuais = [];
            petsAtuais.push(clientes[i].pets);
            let quantidadeAtual = petsAtuais.length;
            for (let j = 0; j < quantidadeAtual; j++) {
                this.pets.push(petsAtuais[j]);
            }
        }
    }

    mostrarDados () {
        console.clear();
        let titulo = "---------- MOSTRAR DADOS ----------";
        console.log(titulo);
        // Funcionario = {id: identification, nome: "Nome", senha: "senha", clientes: {"nome": ["pet1", "pet2", ...]}, consultas: {}}

        console.log(`Nome:     ${this.nomeFuncionario}`);
        console.log(`Senha:    ${this.senha}`);

        prompt("~ Insira qualquer tecla para continuar...");
    }

    modificarDados (funcionarios) {

        let valido = false;
        while (!valido) {
            console.clear();
            console.log("---------- MODIFICAR DADOS ----------");
            console.log("Que dados modificar? (1. Nome; 2. Senha)");
            
            let info = prompt("~ ");
            info = parseInt(info);

            if (info == NaN || info < 1 || info > 2) {
                console.clear();
                console.log("Entrada inválida, tente novamente.");

            } else if (info == 1) {
                let novoNome = prompt("Insira o novo nome: ");
                let nomeAntigo = this.nomeFuncionario;
                this.nomeFuncionario = novoNome;
                funcionarios[nomeAntigo].nomeFuncionario = novoNome;
                let conteudo = funcionarios[nomeAntigo];

                delete funcionarios[nomeAntigo];
                funcionarios[novoNome] = conteudo;
                valido = true;

            } else if (info == 2) {
                let novaSenha = prompt("Insira a nova senha: ");
                this.senha = novaSenha;
                valido = true;
            }
        }
        return funcionarios;
    }

    mostrarClientes () {
        console.clear();

        let titulo = "---------- MOSTRAR CLIENTES ----------";

        console.log(titulo);

        let quantidade = this.clientes.length;
        let nomesClientes = [];
        
        for (let i = 0; i < quantidade; i++) {
            
            let clienteAtual = this.clientes[i];
            
            let petsAtuais = [];

            let quantidadePets = clienteAtual.pets.length;
            for (let j = 0; j < quantidadePets; j++) {
                petsAtuais.push(clienteAtual.pets[j].nomePet)
            }

            let nomeClienteAtual = `${capitalize(clienteAtual.nomeCliente)} : `;

            for (let j = 0; j < petsAtuais.length; j++) {
                if (j == petsAtuais.length -1) {
                    nomeClienteAtual = `${nomeClienteAtual} ${capitalize(petsAtuais[j])};`;
                } else {
                    nomeClienteAtual = `${nomeClienteAtual} ${capitalize(petsAtuais[j])},`;
                }
            } 

            nomesClientes.push(nomeClienteAtual);

        }

        nomesClientes = nomesClientes.sort();
        for (let i = 0; i < nomesClientes.length; i++) {
            console.log(`${i+1}. ${nomesClientes[i]}`);
        }

        prompt("~ Insira qualquer tecla para continuar.");
    }

    mostrarPets () {
        console.clear();
        
        let titulo = "---------- MOSTRAR PETS ----------";

        console.log(titulo);

        let quantidadeClientes = Object.keys(this.clientes).length; 
        for (let i = 0; i < quantidadeClientes; i++) {
            let clienteAtual = this.clientes[i];
            console.log(clienteAtual.mostrarPets());
        }

        prompt("~ Insira qualquer tecla para continuar.")
    }
    adicionarCliente (clientes) {
        let titulo = "---------- ADICIONAR CLIENTE ----------";
        
        while (true) {
            console.clear();
            console.log(titulo);

            let nome = prompt("Insira o nome do cliente: ");
            let pets = [];

            while (true) {
                let pet = prompt("Insira o nome do pet deste cliente: ");

                let novoPet = new Animal (pet,nome);

                pets.push(novoPet);

                console.clear();
                console.log(titulo);
                console.log("Deseja adicionar mais um pet? (s/n)")
                let mais = prompt("~ ");
                if (mais == "s") {
                    // NADA
                } else {
                    break;
                }
            }

            // Instanciando um novo cliente e adicionando ele ao dicionario de novos clientes

            let clienteAtual = new Cliente(nome, pets);

            this.clientes.push(clienteAtual);

            for (let i =0; i<pets.length; i++) {
                this.pets[pets[i].nomePet] = pets[i];
            }

            console.clear();
            console.log(titulo);

            console.log("Deseja adicionar mais um cliente? (s/n)");
            let opcao = prompt("~ ");
            if (opcao == "s") {
                // NADA
            } else {
                break;
            }
        }
        clientes[this.nomeFuncionario] = this.clientes;
        return clientes;
    }
    //TODO: CHECAR
    adicionarPet (clientes, funcionarios) {
        let titulo = "---------- ADICIONAR PET ----------";
        while (true) {
            console.clear();
            console.log(titulo);

            let quantidade = Object.keys(this.clientes).length;
            let nomesClientes = [];

            for (let i = 0; i < quantidade; i++) {
                let clienteAtual = this.clientes[i];
                let nomeClienteAtual = clienteAtual.nomeCliente;
                nomesClientes.push(nomeClienteAtual);

                console.log(`${i+1}. ${capitalize(nomeClienteAtual)}`);
            }

            console.log("Insira o índice do cliente para adicionar um pet: ");
            let indice = prompt("~ ");
            
            indice = parseInt(indice);

            if (indice == NaN || indice < 1 || indice > nomesClientes.length) {
                invalido();
                continue;
            } else {
                indice--;
                
                console.clear();
                console.log(titulo);

                console.log(`Deseja mesmo adicionar um pet para ${nomesClientes[indice]}? (s/n)`);
                let confirmacao = prompt("~ ");

                if (confirmacao == "s") {
                    let cliente = this.clientes[indice];
                    console.clear();
                    console.log(titulo);
                    let nomePet = prompt("Insira o nome do pet: ");
                    cliente.adicionarPet(this.nomeCliente, nomePet);
                    this.clientes[indice] = cliente;
                    this.pets[nomePet] = cliente.pets[-1];

                    // console.log(this.clientes); //TODO: Remover
                    // console.log(this.pets);
                    // prompt()
                    
                } else if (confirmacao == "n") {
                    console.clear();
                    console.log(titulo);
                    console.log("Cancelando adição...")
                } 
                else {
                    invalido("Entrada inválida, tente novamente");
                    continue;
                }
            }
            console.clear();
            console.log(titulo);

            console.log("Deseja adicionar mais algum pet? (s/n)");
            let opcao = prompt("~ ");

            if (opcao == "s") {
                //NADA
            } else {
                break;
            }
        }
        funcionarios[this.nomeFuncionario].clientes = this.clientes;
        funcionarios[this.nomeFuncionario].pets     = this.pets;

        return [clientes[this.nomeFuncionario] = this.clientes, funcionarios];
    }
    removerPet (clientes) {
        let titulo = "---------- REMOVER PET ----------";
        while (true) {
            console.clear();
            console.log(titulo);

            let quantidade = this.clientes.length;
            let nomesClientes = [];

            for (let i = 0; i < quantidade; i++) {
                let clienteAtual = this.clientes[i];
                let nomeClienteAtual = clienteAtual.nomeCliente;
                nomesClientes.push(nomeClienteAtual);

                console.log(`${i+1}. ${capitalize(nomeClienteAtual)}`);
            }

            console.log("Insira o índice do cliente para ser remover o pet: ");
            let indice = prompt("~ ");
            
            indice = parseInt(indice);

            if (indice == NaN || indice < 1 || indice > nomesClientes.length) {
                invalido();
                continue;
            } else {
                indice--;
                
                console.clear();
                console.log(titulo);

                console.log(`Deseja mesmo remover um pet de ${nomesClientes[indice]}? (s/n)`);
                let confirmacao = prompt("~ ");

                if (confirmacao == "s") {
                    let cliente = this.clientes[indice];
                    cliente.removerPet();
                    this.clientes[indice] = cliente;
                } else if (confirmacao == "n") {
                    console.clear();
                    console.log(titulo);
                    console.log("Cancelando remoção...");
                }
                else {
                    invalido("Entrada inválida, tente novamente");
                    continue;
                }
            }
            console.clear();
            console.log(titulo);

            console.log("Deseja remover mais algum pet? (s/n)");
            let opcao = prompt("~ ");

            if (opcao == "s") {
                //NADA
            } else {
                break;
            }
        }
        return clientes[this.nomeFuncionario] = this.clientes;
    }
    removerCliente(clientes) {
        let titulo = "---------- REMOVER CLIENTE ----------";
        while (true) {
            console.clear();
            console.log(titulo);

            let quantidade = this.clientes.length;
            let nomesClientes = [];

            for (let i = 0; i < quantidade; i++) {
                let clienteAtual = this.clientes[i];
                let nomeClienteAtual = clienteAtual.nomeCliente;
                nomesClientes.push(nomeClienteAtual);

                console.log(`${i+1}. ${capitalize(nomeClienteAtual)}`);
            }

            console.log("Insira o índice do cliente para ser removido: ");
            let indice = prompt("~ ");
            
            indice = parseInt(indice);

            if (indice == NaN || indice < 1 || indice > nomesClientes.length) {
                invalido();
                continue;
            } else {
                indice--;
                
                console.clear();
                console.log(titulo);

                console.log(`Deseja mesmo deletar ${nomesClientes[indice]}? (s/n)`);
                let confirmacao = prompt("~ ");

                if (confirmacao == "s") {
                    this.clientes.splice(indice, 1);
                } else {
                    invalido("Entrada inválida, tente novamente");
                    continue;
                }
            }
            console.clear();
            console.log(titulo);

            console.log("Deseja remover mais algum cliente? (s/n)");
            let opcao = prompt("~ ");

            if (opcao == "s") {
                //NADA
            } else {
                break;
            }
        }
        return clientes[this.nomeFuncionario] = this.clientes;
    }

    /* Consultas */
    mostrarConsultas () {
        let titulo = "---------- MOSTRAR CONSULTAS ----------";
        console.clear();
        console.log(titulo);

        if (Object.keys(this.consultas) != 0) {

            let datas = Object.keys(this.consultas);
            let consultas = Object.values(this.consultas);
    
            // Ordenando datas e consultas
            let ordenacao = quicksortMod(datas, consultas);
    
            for (let i = 0; i < ordenacao.length; i++) {
    
                let dataAtual     = ordenacao[i][0][0];
    
                if (dataAtual == undefined) {
                    continue; // As vezes a função vai retorar pivots
                    //vazios, isso lida com eles
                }
    
                let hora          = dataAtual.slice(4,6);
                let dia           = dataAtual.slice(2,4);
                let mes           = dataAtual.slice(0,2);
                let dataFormatada = `${hora}:00 - ${dia}/${mes}`;
    
                let consulta = ordenacao[i][1][0];
                let cliente  = consulta.nomeCliente;
                let pet      = consulta.nomePet;
                let status   = consulta.status;
    
                console.log(`${i+1}. ${dataFormatada}`);
                console.log(`-> Cliente: ${cliente} | Pet: ${pet} | Status: ${status};`);
            }
        }
    }
    mudarStatusConsulta (funcionarios, consultas) {
        let titulo = "---------- MUDAR STATUS DE CONSULTA ----------";
        while (true) {
            console.clear();
            console.log(titulo);

            this.mostrarConsultas();
            let consultas = quicksortMod(this.consultas);
            let consultaAtual;

            console.log("Insira o índice da consulta: ");
            let indice = prompt("~ ");
            
            indice = parseInt(indice);

            if (indice == NaN || indice < 1 || indice > nomesClientes.length) {
                invalido();
                continue;
            } else {
                indice--;
                
                console.clear();
                console.log(titulo);

                console.log("Qual vai ser o novo status?");
                console.log("1. cancelada;");
                console.log("2. adiada;");
                console.log("3. realizada; ");
                console.log("4. pendente");
                let opcao = prompt("~ ");
                opcao = parseInt(opcao);

                if (opcao == NaN || opcao < 1 || opcao > 4) {
                    invalido();
                    continue;
                }

                consultaAtual = consultas[indice][0][0]; // Isso pega a data da consulta atual

                let novoStatus;
                switch(opcao) {
                    case 1:
                        novoStatus = "cancelada";
                    case 2:
                        novoStatus = "adiada";
                    case 3:
                        novoStatus = "realizada";
                    case 4:
                        novoStatus = "pendente";
                }

                this.consultas[consultaAtual].status = novoStatus;

            }
            console.clear();
            console.log(titulo);

            console.log("Deseja remover mais algum pet? (s/n)");
            let opcao = prompt("~ ");

            if (opcao == "s") {
                //NADA
            } else {
                break;
            }
        }
        funcionarios[this.nomeFuncionario].consultas = this.consultas;
        consultas[this.nomeFuncionario] = this.consultas;
        return [funcionarios, consultas];
    }
    marcarConsultas (funcionarios, consultas) {
        
        let titulo = "---------- MARCAR CONSULTA ----------";
        
        while (true) {
            let dataOriginal;

            let remarcar = false;
            let datasOcupadas = Object.keys(this.consultas);
    
            // Loop para criar a data
            while (true) {
                console.clear();
                console.log(titulo);
                
                console.log("Digite a hora da consulta: (Somente a hora, sem minutos)");
                let hora = prompt("~ ");
                console.log("Digite o dia da consulta: ");
                let dia = prompt("~ ");
                console.log("Digite o mês da consulta: (1-12)");
                let mes = prompt("~ ");
    
                let data = `${mes}${dia}${hora}`;
                dataOriginal = data;
    
                if (Object.keys(this.consultas) == 0) {
                    break;
                } else if (!datasOcupadas.includes(data)) {
                    break;
                } else {
                    
                    console.clear();
                    console.log(titulo);
                    console.log("Já existe uma consulta nesse horário. Remarcar? (s/n)");
                    let opcao = prompt(" ~ ");
    
                    if (opcao == "s") {
                        remarcar = true;
                        break;
                    } else if (opcao == "n") {
                        return [funcionarios, consultas];
                    } else {
                        invalido("Voltando para marcar nova data.");
                    }
                }   
            }
            if (remarcar === true) {
                console.clear();
                console.log(titulo);
                console.log("Para quando deseja remarcar?");

                console.log("Digite a hora da consulta: (Somente a hora, sem minutos)");
                let hora = prompt("~ ");
                console.log("Digite o dia da consulta: ");
                let dia = prompt("~ ");
                console.log("Digite o mês da consulta: (1-12)");
                let mes = prompt("~ ");
    
                let dataNova = `${mes}${dia}${hora}`;

                this.consultas[dataOriginal].data = dataNova;
                let consulta = this.consultas[dataOriginal];

                delete this.consultas.dataOriginal;

                this.consultas[dataNova] = consulta;

                funcionarios[this.nomeFuncionario].consultas = this.consultas;
                let consultasGerais = consultas[dataOriginal];
                if (consultasGerais == undefined) {
                    delete consultas[dataOriginal];
                    consultas[dataNova] = [consulta];
                }
            } else {

                console.clear();
                console.log(titulo);
    
                console.log("Digite o nome do cliente: ");
                let cliente = prompt("~ ");
                console.log("Digite o nome do pet: ");
                let pet = prompt("~ ");
    
                console.log("Qual vai ser o status da consulta?");
                console.log("1. cancelada;");
                console.log("2. adiada;");
                console.log("3. realizada; ");
                console.log("4. pendente");
                let opcao = prompt("~ ");
                opcao = parseInt(opcao);
                let status;
                if (opcao == NaN || opcao < 1 || opcao > 4) {
                    invalido();
                    continue;
                }
                switch (opcao) {
                    case 1:
                        status = "cancelada";
                        break;
                    case 2:
                        status = "adiada";
                        break;
                    case 3:
                        status = "realizada";
                        break;
                    case 4:
                        status = "pendente";
                        break;
                }
                this.consultas[dataOriginal] = new Consulta(cliente,pet,this.nomeFuncionario,status,dataOriginal);
    
                if (Object.keys[consultas] == undefined) {
                    consultas[this.nomeFuncionario] = [this.consultas[dataOriginal]];
                } else if (Object.keys[consultas].includes(this.nomeFuncionario)) {
                    consultas[this.nomeFuncionario].push(this.consultas[dataOriginal]);
                } else {
                    consultas[this.nomeFuncionario] = [this.consultas[dataOriginal]];
                }
            }

            funcionarios[this.nomeFuncionario].consultas = this.consultas;

            console.clear();
            console.log(titulo);
            console.log("Deseja marcar mais uma consulta? (s/n)");
            let opcao = prompt("~ ");

            if (opcao == "s") {
                // nada
            } else {
                break;
            }
        }
        return [funcionarios, consultas];
    }
}
class Sistema {

    constructor () {
        this.funcionarios = {}; // objeto = {"id": id, "nome": nome, "senha": senha, "clientes": {cliente1: [pets]}, "consultas": {}}
        this.consultas    = {}; // objeto = {"id": id, "nomeFunc": "nome", "nomeCli": "nome", "nomePet": "nome", "data": [dd,mm,aa], "status": status}
        this.clientes     = {}; //  objeto = {"nome": ["nomePet1", "nomePet2", "nomePet3", "nomePet4", ...]}

        // Inicializa todo o programa:
        this.main();
    }
    menuPrincipal () {
        /*
        Essa função vai interagir com o usuário e determinar
        que tipo de ação ele vai fazer, passando assim para 
        a função da interação propriamente dita.
        */
        let opcao

       while (true) {
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
            console.log("9.  Editar consulta;");
            console.log("10. Remover cliente;");
            console.log("11. Remover pet;");
            console.log("12. Cancelar consulta;");
            console.log("13. Remover funcionário;");
            console.log("14. Adicionar Cliente;");
            console.log("15. Adicionar Pet;")
            console.log("16. Fazer logout;\n");

            opcao = prompt("Insira o número da ação: ");

            opcao = parseInt(opcao);

            if (opcao == NaN || opcao <= 0 || opcao > 16) {
                invalido();
            } else {
                break;
            }
        }
        return opcao;
    }
    menuNaoLogado () {
        /*
        Primeira interação com o usuário. Retorna a opção a ser realizada:
        cadastro ou login.
        */
       let opcao;
        while (true) {
            console.clear();
            console.log("---------- MENU INICIAL ----------");
            console.log("1. Cadastro");
            console.log("2. Login");
            console.log("3. Sair");

            opcao = prompt("Insira a opção desejada: ");
            opcao = parseInt(opcao);

            if (opcao == NaN || opcao > 3 || opcao < 1) {
                invalido();
            } else {
                break;
            }
        }
        return opcao;
    }
    cadastro () {
        /*
        Realiza o cadastro de um novo funcionário, instancia esse novo
        objeto e, por fim, retorna seu nome.
        */

       let nomeFuncionario;
       let senhaFuncionario;
       

       let titulo = "---------- CADASTRO ----------";
        console.clear();
        console.log(titulo);
        nomeFuncionario = prompt("Insira o seu nome: ");
        while (true) {
            console.clear();
            console.log(titulo);
            senhaFuncionario = prompt("Insira a sua senha: ");
            let confirmacao = prompt("Confirme sua senha: ");
            if (senhaFuncionario == confirmacao) {
                break;
            } else {
                invalido("As senhas não conferem, tente novamente...");
            }
        }
        let funcionarioAtual = new Funcionario(nomeFuncionario, senhaFuncionario);

        this.funcionarios[nomeFuncionario.toLowerCase()] = funcionarioAtual;
        return funcionarioAtual;
    }
    login () {
        /*
        Realiza o procedimento de login, procura pelo nome do funcionário
        no objeto de funcionários, onde as chaves são os nomes dos mesmos.
        */
       let nomeFuncionario;
       let senhaFuncionario;
       let nomeFuncionariosAtuais = Object.keys(this.funcionarios);
       while (true) {

            console.clear();
            console.log("---------- LOGIN ----------");
            nomeFuncionario = prompt("Insira seu nome: ");
            let opcao = prompt(`Seu nome é ${nomeFuncionario}? (s/n)`);
            if (opcao == "s") {
                break;
            } else if (opcao == "n") {
                // Nada acontece
            } else {
                invalido();
                continue;
            }
            nomeFuncionario = nomeFuncionario.toLowerCase();
            if (!nomeFuncionariosAtuais.includes(nomeFuncionario)) {
                invalido("Este usuário não está cadastrado, tente novamente, ou realize o cadastro.");
                console.log("---------- LOGIN ----------");
                console.log("Gostaria de continuar procedimento de login ou sair para cadastro?");
                let opcao = prompt("(1. login/2. cadastro)\n");
                if (opcao == "2") {
                    return -1; // Retorna -1 em caso de erro.
                }
            }
        }

        // Checagem de se a senha inserida é a mesma do usuário
        let senhaCerta = this.funcionarios[nomeFuncionario].senha;

        while (true) {
            console.clear();
            console.log("---------- LOGIN ----------");
            senhaFuncionario = prompt("Insira a senha: ");

            let confirmacao = prompt("Confirme a senha: ");
            if (senhaFuncionario == confirmacao && senhaFuncionario == senhaCerta) {
                break;
            } else if (senhaFuncionario != confirmacao) {
                invalido("As senhas não conferem, tente novamente.");
                break;
            } else if (senhaFuncionario == confirmacao && !(senhaFuncionario == senhaCerta)){
                invalido("As senhas conferem, mas estão erradas. Tente novamente.");
            } else {
                invalido();
            }
        }
        return nomeFuncionario;
    }
    mostrarConsultas (funcionario) {
        let titulo = "---------- MOSTRAR CONSULTAS ----------";
        console.clear();
        console.log(titulo);

        funcionario.mostrarConsultas();

        prompt("Insira qualquer tecla para continuar...");
    }
    mostrarFuncionarios () {
        console.clear();

        let titulo = "---------- MOSTRAR FUNCIONARIOS ----------";

        console.log(titulo);
        
        let funcionarios = Object.keys(this.funcionarios);
        let quantidade = funcionarios.length;

        for (let i = 0; i < quantidade; i++) {
            funcionarios[i] = capitalize(funcionarios[i]);
        }
        funcionarios = funcionarios.sort();

        for (let i = 0; i < quantidade; i++) {
            console.log(`${i+1}. ${funcionarios[i]};`);
        }
    }

    //TODO: simplifiquei a proposta, não checo consultas...
    removerFuncionario () {
        while (true){
            console.clear();

            let titulo = "---------- REMOVER FUNCIONARIO ----------";

            console.log(titulo);

            let indice = prompt("Insira o índice do funcionário a ser deletado: ");
            let funcionarios = Object.keys(this.funcionarios);

            for (let i = 0; i< funcionarios.length; i++) {
                console.log(`${i+1}. ${capitalize(funcionarios[i])}`);
            }

            let deletar = funcionarios[indice-1];

            console.clear();
            console.log(titulo);

            console.log(`Deseja deletar o(a) ${deletar}? (s/n)`);
            let confirmar = prompt(" ~ ");
            if (confirmar == "s") {
                console.clear();
                console.log(titulo);
                console.log("Continuando deleção.");

                delete this.funcionarios[deletar];

                // if (consultas == {}) {
                //     delete this.funcionarios[deletar];
                //     console.log("Deleção concluída!");
                //     break;
                // } else {
                //     invalido(`${deletar} ainda tem consultas pendentes, deleção cancelada.`);
                //     break;
                // }

            } else if (confirmar == "n") {
                console.clear();
                console.log(titulo);

                console.log("Deleção cancelada. Deseja voltar ao menu? (s/n)");
                let opcao = prompt(" ~ ");
                if (opcao == "s") {
                    break;
                }
            } else {
                invalido();
            }
        }
    }
    quit() {
        process.exit();
    }
    // Função principal do programa
    main () {
        while (true) {
            console.clear();
            // Quando o sistema é inicializado, devemos primeiro fazer o login/cadastro do usuário no sistema em si
            let acao = this.menuNaoLogado();
            let funcionarioAtual = -1;

            switch (acao) {
                case 1:
                    funcionarioAtual = this.cadastro();
                    break;
                case 2:
                    while (funcionarioAtual == -1) {
                        funcionarioAtual = this.login();
                    }
                    break;
                case 3:
                    this.quit();
            }

            while (true) {
                // Depois de logado, o sistema entra no laço de repetição principal do programa, onde tem acesso ao menu principal.

                let mainBreak = false; // variavel de controle para sair do laço

                let acao = this.menuPrincipal();

                switch (acao) {
                    case 1:
                        funcionarioAtual.mostrarDados();
                        break;
                    case 2:
                        this.funcionarios = funcionarioAtual.modificarDados(this.funcionarios);
                        break;
                    case 3:
                        funcionarioAtual.mostrarClientes();
                        break;
                    case 4:
                        funcionarioAtual.mostrarPets();
                        break;
                    case 5:
                        this.mostrarConsultas(funcionarioAtual);
                        break;
                    case 6:
                        this.mostrarFuncionarios();
                        prompt("~ Insira qualquer tecla para continuar...");
                        break;
                    case 7:
                        let marcar = funcionarioAtual.marcarConsultas(this.funcionarios, this.consultas);
                        this.funcionarios = marcar[0];
                        this.consultas = marcar[1];
                        break;
                    case 8:
                        let mudar = funcionarioAtual.mudarStatusConsulta();
                        this.funcionarios = mudar[0];
                        this.consultas = mudar[1];
                        break;
                    case 9:
                        this.editarConsultas(funcionarioAtual);
                        break;
                    case 10:
                        this.clientes = funcionarioAtual.removerCliente(this.clientes);
                        break;
                    case 11:
                        this.clientes = funcionarioAtual.removerPet(this.clientes);
                        break;
                    case 12:
                        this.cancelarConsultas(funcionarioAtual);
                        break;
                    case 13:
                        this.removerFuncionario(funcionarioAtual);
                        break;
                    case 14:
                        this.clientes = funcionarioAtual.adicionarCliente(this.clientes);
                        break;
                    case 15:
                        let arr = funcionarioAtual.adicionarPet(this.clientes, this.funcionarios);
                        this.clientes     = arr[0];
                        this.funcionarios = arr[1];
                        break;
                    case 16:
                        mainBreak = true;
                        break;
                }

                // Controle se o funcionario fez logout, para sair do menu 
                // principal e voltar ao menu de pessoas sem login/cadastro
                if (mainBreak) {
                    break;
                }
            }
        }
    }
}
// Função auxiliar para ajudar a cuidar de erros
function invalido (mensagem="") {
    console.clear();
    if (mensagem === "") {
        console.log("Entrada inválida, tente novamente...");
    } else {
        console.log(mensagem);
    }
    // Contas para dar tempo do usuário ler a informação
    // antes de ser deletada (tentei usar setTimeout, mas não obtive sucesso)
    for (let i=0; i < (10**6); i++) {
        for (let j=0; j < (10**4); j++) {
            let k = i**j;
        }
    }
    console.clear(); 
}
// Função para capitalizar texto, como capitalize do python
function capitalize(str) {
    if (typeof str != 'string') {
        throw new Error('Entrada deve ser texto.')
    }
    if (str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
// Função para ordenar consultas cronologicamente
function quicksortMod(datas, consultas) {
    
    /*
    Função recursiva para ordenar as consultas,
    uma modificação de quicksort para fazer todas trocas
    com datas e consultas, em paralelo
    */

    // Caso base
    if (datas.length <=1) {
        return [datas, consultas];
    }

    // Caso recursivo e declarações

    let pivotDatas             = datas[0];
    let pivotConsultas         = consultas[0];
    let listaEsquerdaDatas     = [];
    let listaDireitaDatas      = [];
    let listaEsquerdaConsultas = [];
    let listaDireitaConsultas  = [];

    for (let i=1; i<datas.length; i++) {
        if (datas[i] < pivotDatas) {
            listaEsquerdaDatas.push(datas[i]);
            listaEsquerdaConsultas.push(consultas[i]);
        } else {
            listaDireitaDatas.push(datas[i]);
            listaDireitaConsultas.push(consultas[i]);
        }
    }
    return [quicksortMod(listaEsquerdaDatas, listaEsquerdaConsultas), [[pivotDatas], [pivotConsultas]], quicksortMod(listaDireitaDatas,listaDireitaConsultas)];
}

let programa = new Sistema();

