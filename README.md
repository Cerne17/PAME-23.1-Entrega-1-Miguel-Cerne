PRIMEIRA ENTREGA DO PERÍODO TRAINEE DA FLUXO 23.1:

Projeto avaliativo com base em OOP em javascript.

-----------------------------------------------

ORGANIZAÇÃO DO PROJETO:

    Eu organizei meu projeto em 5 classes diferentes:
        1. Cliente;
        2. Animal;
        3. Funcionario;
        4. Consulta;
        5. Sistema.
    
    As classes estão organizadas de forma que cada uma tenha seus
    atributos básicos e possam ter métodos em caso de
    funcionalidades extras necessárias. Tentei, portanto, deixar
    meu código bem explicado e limpo de forma que ele seja 
    modularizado e facilmente expansível.


-----------------------------------------------

CLIENTE:

    1. ATRIBUTOS:
        Essa classe tem alguns atributos básicos: id (um
        identificador único, gerado usando a biblioteca uuid)
        nome (string com o nome do cliente), pets (um array de
        strings com os nomes de seus pets), fidelizado (booleano)

        id é criado com a instanciação da classe;
        nome é inserido pelo usuário no momento de instanciação;
        pets também inseridos na instanciação;
        fidelizado inicialmente inicializada como falso;

        OBS: Fidelizado é mudado para true no momento em que
        qualquer pet do cliente tem, ao menos, 4 consultas
        com status de 'realizada'.

    2. MÉTODOS:
        a. mostrarPetsLinha
            Função utilizada para mostrar todos pets de um
            cliente, sendo todas elas expostas em uma única
            linha no terminal;
        b. mostrarPets
            Semelhante à função anterior, mas esta usa mais
            de uma linha no terminal para exibir os pets;
        c. adicionarPet
            Função para adicionar um novo pet à lista inicial;

-----------------------------------------------

ANIMAL:

    1. ATRIBUTOS:
        Como já expliquei alguns atributos anteriormente, algumas
        explicações serão omitidas de agora em diante:
        
        a. id;
        b. nome;
        c. dono (nome do dono);
        d. funcionario (nome do médico que o atende);
        e. consultas (number) : número de consultas realizadas;
    
-----------------------------------------------

CONSULTA:

    1. ATRIBUTOS:
        a. id;
        b. nomeFuncionario;
        c. nomeCliente;
        d. nomePets;
        e. data (array)
            A data da consulta é formatada da seguinte forma
            [hora, dia, mês] -> [hh, dd, mm]
        f. status (string)
            o status pode ser um dos seguintes:
                - pendente
                - adiada
                - realizada
                - cancelada

-----------------------------------------------

FUNCIONARIO:

    1. ATRIBUTOS:
        a. id;
        b. nomeFuncionario (instanciação);
        c. senha (instanciação);
        d. clientes;
        e. consultas;

    2. MÉTODOS:
        a. mostrarDados
            mostra os dados básicos do funcionário (nome e senha)
        b. modificarDados
            deixa o funcionario mudar seu nome e sua senha
        c. mostrarClientes
            mostra todos os clientes - em ordem alfabética - e
            todos seus respectivos pets
        d. mostrarPets
            mostra todos os pets que essa pessoa cuida, em
            ordem alfabética
        e. adicionarCliente
            adiciona um cliente novo
        f. removerCliente
            remove um cliente

-----------------------------------------------

SISTEMA:

    Apesar do sistema ter menos atributos que o resto das classes,
    pode-se dizer que ele é o mais importante da aplicação,
    já que ele que interconecta todas as outras.

    1. ATRIBUTOS
        a. funcionarios {objeto} -> chaves: nomes, valores: objeto
            guarda a informação de todos funcionários atuais
        b. consultas {objeto} -> chaves: nomeFuncionario, valores: objeto
            guarda a informação de todas consultas
        c. clientes {objeto} -> chaves: nomes, valores: objetos
    
    2. MÉTODOS:
        a. menuPrincipal
            faz a logística de escolher a ação a ser feita
        b. menuNaoLogado
            lógica por trás de criar contas e entrar em contas
        c. cadastro
            cria contas
        d. login
            entra em contas existentes
        e. mostrarConsultas
            mostra todas consultas de um funcionario
        f. editarConsultas
            edita o status de uma consulta e/ou sua data
        g. cancelarConsultas
            muda o status da consulta para cancelada
        h. mostrarFuncionarios
            mostra o nome de todos funcionarios cadastrados
            atualmente, em ordem alfabética
        i. marcarConsultas
            cria novas consultas
        j. removerFuncionario
            remove algum funcionario escolhido, caso o mesmo
            nao tenha nenhuma consulta a ser feita (adiada
            ou pendente)
        k. quit
            função para encerrar o programa
        l. main
            laço principal do aplicativo, une todas anteriores

-----------------------------------------------

FUNÇÕES AUXILIARES:

    1. invalido
        função criada para lidar com erros, tem um "timer"
        implementado para permitir leitura antes de
        limpar a tela
    2. capitalize
        uma alternativa para padronizar a escrita e facilitar
        formatação e ordenação em ordem alfabética

-----------------------------------------------

MELHORIAS:

    Como o tempo para realizar o projeto foi bem curto,
    eu acabei fazendo algumas simplificações:

    1. Checagem de erros:
        Apesar do código ter algumas checagens, elas têm
        como ser muito mais precisas. Devido ao curto prazo
        não consegui pôr essa boa prática no código.
    
    2. Uso de Herança:
        Como muitos objetos dividem características semelhantes, 
        seria interessante ter usado um "molde" para elas, mas
        devido ao curto tempo, como eu ainda não tinha muito 
        costume de trabalhar com essa técnica, tive que abrir
        mão disso. Comecei meu código o usando, mas a legibilidade
        e simplicidade do código estava sendo prejudicada

    3. Uso de Encapsulamento:
        Esse tópico eu não consegui aplicar, também, devido à uma
        confusão em como implementar. Isso poderia causar vulnerabilidades
        no código se fosse para produção, o que é preocupante.
        O uso dos id's no meu código foi negligenciado.

    4. Melhorias na função 'invalido':
        Não consegui pensar em uma forma de fazer o código 'esperar'
        para executar a próxima parte, então forcei cálculos
        para causar o efeito da função 'time.sleep' do python.
        Uma possível saída seria a utilização de Promises.

    5. Subdividir mais o código:
        O código está todo concentrado em apenas um arquivo,
        o que geralmente causa problemas no futuro por falta de
        organização ou contradições lógicas ao implementar
        novas features.

    6. Refatorar o código:
        Como no caso da herança, programando o projeto, eu pude
        ver que muitas vezes eu repeti pedaços de códigos em
        funções análogas. Provavelmente, seria uma boa
        prática separar esses códigos e criar funções separadas
        para elas.
 
-----------------------------------------------