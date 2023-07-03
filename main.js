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
        this.nomeCliente       = nomeClienteC;
        this.pets              = petsC;
        this.fidelizado        = false;
    }
    
    // Função usada no código para mostrar clientes com seus animais em Funcionario
    mostrarPetsLinha () {
        let pets = this.pets.sort();
        let quantidade = pets.length;

        let text = ``;
        for (let i=0; i<quantidade; i++) {
            if (i!=0){
                text = `${text}, ${pets[i]}`;
            } else if (i==quantidade-1) {
                text = `${text}, ${pets[i]}`;
            } else {
                text = `${pets[i]}`;
            }
        }
        return text;
    }
    // Função usada no código para mostrar os pets em Funcionario
    mostrarPets () {
        let text = mostrarPetsLinha();
        text = `${text} - ${this.nomeCliente}`;
        return text;
    }
    adicionarPet () {
        let titulo = "---------- ADICIONAR PET ----------";
        console.clear();
        console.log(titulo);
        let nome = prompt("Insira o nome do pet: ");
        this.pets.push(nome);
        console.clear();
        console.log(titulo);
        console.log(`${nome} adicionado à lista de pets de ${this.nomeCliente}`);
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

    constructor (nomePetC, donoC, consultasC) {
        this.#id       = uuidv4();
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
        this.senha          = senhaC;
        this.clientes        = [];
        this.consultas       = {};
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

    mostrarClientes () {
        console.clear();

        let titulo = "---------- MOSTRAR CLIENTES ----------";

        console.log(titulo);

        let clientes = Object.keys(this.clientes).sort();
        let quantidade = clientes.length;

        for (let i = 0; i < quantidade; i++) {

            console.log(`${i+1}. ${clientes[i]}: ${clientes[i].mostrarPetsLinha()}`);
        }
        prompt("~ Insira qualquer tecla para continuar.");
    }

    mostrarPets () {
        console.clear();
        
        let titulo = "---------- MOSTRAR PETS ----------";

        console.log(titulo);

        let quantidadeClientes = Object.keys(clientes).length; 
        for (let i = 0; i < quantidadeClientes; i++) {
            let clienteAtual = this.clientes[i];
            console.log(clienteAtual.mostrarPets());
        }

        prompt("~ Insira qualquer tecla para continuar.")
    }
    adicionarCliente (clientes) {
        let titulo = "---------- ADICIONAR CLIENTE ----------";
        let novosClientes = [];
        
        while (true) {
            console.clear();
            console.log(titulo);

            let nome = prompt("Insira o nome do cliente: ");
            let pets = [];

            while (true) {
                let pet = prompt("Insira o nome do pet deste cliente: ");

                pets.push(pet);

                console.clear();
                console.log(titulo);
                let mais = prompt("Deseja adicionar mais um pet? (s/n)\n~ ");
                if (mais == "s") {
                    // NADA
                } else {
                    break;
                }
            }

            // Instanciando um novo cliente e adicionando ele ao dicionario de novos clientes
            let clienteAtual = new Cliente(nome, pets);
            novosClientes.push(clienteAtual);

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
        this.clientes.push(novosClientes);
        clientes[this.nomeFuncionario] = this.clientes;
        return clientes;
    }
    removerCliente() {
        //TODO: fazer essa função
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
            console.log("9.  Remover cliente;");
            console.log("10. Remover pet;");
            console.log("11. Cancelar consulta;");
            console.log("12. Remover funcionário;");
            console.log("13. Adicionar Cliente;");
            console.log("14. Adicionar Pet;")
            console.log("15. Fazer logout;\n");

            opcao = prompt("Insira o número da ação: ");

            opcao = parseInt(opcao);

            if (opcao == NaN || opcao <= 0 || opcao > 15) {
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
                invalido("As senhas não conferem, tente novamente.")
            } else if (senhaFuncionario == confirmacao && !(senhaFuncionario == senhaCerta)){
                invalido("As senhas conferem, mas estão erradas. Tente novamente.");
            } else {
                invalido()
            }
        }
        return nomeFuncionario;
    }
    mostrarConsultas (funcionario) {

    }
    editarConsultas (funcionario) {

    }
    cancelarConsultas(funcionario) {

    }
    mostrarFuncionarios () {
        console.clear();

        let titulo = "---------- MOSTRAR FUNCIONARIOS ----------";

        console.log(titulo);
        
        let funcionarios = Object.keys(this.funcionarios);
        let quantidade = funcionarios.length;

        for (let i = 0; i < quantidade; i++) {
            console.log(`${i+1}. ${funcionarios[i]};`);
        }
    }
    //TODO: FUNÇAO INACABADA
    marcarConsultas (funcionario) {
        
        let titulo = "---------- MARCAR CONSULTA ----------";
        let remarcar = false;
        let datasOcupadas = Objectfuncionario.consultas.data

        // Loop para criar a data
        while (true) {
            console.clear();
            console.log(titulo);
            
            console.log("Digite a hora da consulta: (Somente a hora, sem minutos)");
            let hora = prompt(" ~ ");
            console.log("Digite o dia da consulta: ");
            let dia = prompt(" ~ ");
            console.log("Digite o mês da consulta: (1-12)");
            let mes = prompt(" ~ ");

            let data = [hora, dia, mes];

            if (funcionario.consultas == {}) {
                break;
            } else if (funcionario.consultas.includes(data)) {
                
                console.clear();
                console.log(titulo);
                console.log("Já existe uma consulta nesse horário. Remarcar? (s/n)");
                let opcao = prompt(" ~ ");

                if (opcao == s) {
                    remarcar = true;
                    break;
                } else {
                    invalido("Voltando para marcar nova data.")
                }
            }   
        }
        if (remarcar === true) {
            console.clear();
            console.log(titulo);
            console.log("Para quando deseja remarcar")
        }

        // Loop

    }
    adicionarPet(funcionario) {
        /*
        Essa função interage com o usuário para selecionar o cliente
        em seguida chama a função de mesmo nome da classe Cliente e adiciona o pet.
        */
       let titulo = "---------- ADICIONAR PET ----------";

       console.clear();
       console.log(titulo);

       // Usar função mostrar clientes.

    }
    removerPet (funcionario) {

    }
    //TODO: BUG Mesmo quando o funcionario não tem consultas, ele acusa que tem
    removerFuncionario () {
        while (true){
            console.clear();

            let titulo = "---------- REMOVER FUNCIONARIO ----------";

            console.log(titulo);
            this.mostrarFuncionarios();

            let indice = prompt("Insira o índice do funcionário a ser deletado: ");
            let funcionarios = Object.keys(this.funcionarios);

            let deletar = funcionarios[indice-1];

            console.clear();
            console.log(titulo);

            console.log(`Deseja deletar o(a) ${deletar}? (s/n)`);
            let confirmar = prompt(" ~ ");
            if (confirmar == "s") {
                console.clear();
                console.log(titulo);
                console.log("Continuando deleção.");

                let funcionario = this.funcionarios[deletar];
                console.log(funcionario);
                let consultas = funcionario.consultas;
                console.log(consultas);

                if (consultas == {}) {
                    delete this.funcionarios[deletar];
                    console.log("Deleção concluída!");
                    break;
                } else {
                    invalido(`${deletar} ainda tem consultas pendentes, deleção cancelada.`);
                    break;
                }

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
    logout (funcionario) {
        
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
                        funcionarioAtual.modificarDados();
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
                        this.marcarConsultas(funcionarioAtual);
                        break;
                    case 8:
                        this.editarConsultas(funcionarioAtual);
                        break;
                    case 9:
                        funcionarioAtual.removerCliente();
                        break;
                    case 10:
                        this.removerPet(funcionarioAtual);
                        break;
                    case 11:
                        this.cancelarConsultas(funcionarioAtual);
                        break;
                    case 12:
                        this.removerFuncionario(funcionarioAtual);
                        break;
                    case 13:
                        this.clientes = funcionarioAtual.adicionarCliente(this.clientes);
                        break;
                    case 14:
                        this.adicionarPet(funcionarioAtual);
                        break;
                    case 15:
                        this.logout();
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

let programa = new Sistema();