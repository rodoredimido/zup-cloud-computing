## Características
    nodejs: `11.4.0`
    yarn: `1.16.0`
    docker: `laster`
    docker-compose laste
Foi usado o linux ubuntu-server 18.10 com docker
para compilar, executar gerar container no docker,
para inicializar com o `docker-compose`.
A versão do mongoDB foi usada: `4.0`

No seguinte link são os passos a seguir para instalar o mongoDB em windows:
`https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/`

no linux:
https://docs.mongodb.com/manual/administration/install-on-linux/

no macOS:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ 

## INTALAR E EXECUTAR
È Para iniciar o aplicativo é necessário fazer o download de todas as suas dependências, rodar `yarn install`, é possível baixar as dependências, para executá-lo seria como 'servidor nó' seria possível.
Para executar o serviço de servidor  `yarn start`

## Testes Unitarios é de integração
Para realizar testes unitários é necessário executar o comando `yarn test`, se quiser ver com detalhes execute` yarn test --verbose`
se quer que os testes escutando  quando você tem uma mudança no código fonte: `teste de fios --watchAll --verbose`, Para executar os testes junto com o teste de `coverage` execute` - watchAll --verbose --coverage`

## Documentação ENTPOINTS API



API cloud_computing: a documentação da API pode ser encontrada no seguinte link:
https://documenter.getpostman.com/view/6153522/S1a32Shx está documentado em todos os endpoints propostos.

O token para clientes foi implementado para testar os pontos do cliente, então é necessário ter o token gerado no login,
o token vialha pelo headers do Request com o nome do token: 'token value' 

 modelo do url da API:
 http://localhost:3000/api/v1/endpoints 

onde: 'localhost: 3000' 'localhost' é o endereço ip "3000" é o número da porta exposta
       '/api' indica que é uma API
       '/api/v1' indica a versão da API
       '/api/v1/{endpoints}' é o ponto de solicitação
                           pode ser: login, clientes, serviços,
                           usuários, faturas

<a href='https://documenter.getpostman.com/view/6153522/S1a32Shx'>aquim</a> é especificado
 a documentação de cada uma das endopints.
na pasta `/postman/test_computing_cloud.postman_collection.json`, a configuração do carteiro para o teste manual do aplicativo é exportada.
você pode inportar esta configuração no postman `File-> import` então está pronto para testes manuais.

Resumidamente, os endpoints estão documentados neste artigo
 endpoints:
   login:
      POST: login: pelo método 'POST' efetue login no sistema, gerando um token 
    usuários <br>
        GET: /api/v1/users: Listar usuários <br>
        GET: /api/v1/users/id: obtenha um único usuário através do id dele<br>
        POST: /api/v1/users: crie um usuário, se o email não existir<br>
        PUT: /api/v1/usuário/id: atualiza um usuário de acordo com o id<br>
        DELETE: /api/v1/user/id: Apaga um usuário de acordo com o id<br>
     clientes<br>
        GET: /api/v1/clients: listar clientes<br>
        GET: /api/v1/clients/id: obtenha um único cliente através do id dele<br>
        POST:/api/v1/clients: crie um cliente, se o email não existir<br>
        PUT: /api/v1/clients/id: atualiza um cliente de acordo com o id<br>
        DELETE: /api/v1/clients/id: remove um cliente de acordo com o id<br>
     serviços<br>
        GET: /api/v1/services: listar serviços<br>
        GET: /api/v1/services/id: obtenha um único serviço através do id dele<br>
        POST: /api/v1/services: crie um serviço, se o email não existir<br>
        PUT: /api/v1/services:/id: atualiza os serviços de acordo com o id<br>
        DELETE: /api/v1/services/id: remova os serviços de acordo com o id<br>
     faturas<br>
         GET: /api/v1/invoices: lista todas as faturas paginadas e<br>
             por padrão, ele tem uma página formada do item 0 ao item 100<br>
             isso pode ser configurado pelos parâmetros url `/api/v1/invoices?init=0&limit=100`<br>
             onde `init` é o número inicial da página e o limite é a quantidade de dados<br>
             para a página.<br>
        GET: /api/v1/invoices/client/id is: listar faturas para um cliente<br>
        GET: /api/v1/invoices/id: obtenha uma única fatura através do id<br>
        POST: /api/v1/invoices: crie uma fatura para um cliente, se ele não tiver<br>
              faturas abertas, caso contrário, você precisará fechar a fatura para poder<br>
              criar um novo<br>
        PUT: /api/v1/invoices/id: atualizar uma atualização de uma fatura, atualizar os serviços<br>
        PUT: /api/v1/faturas/close/id: fecha uma fatura de acordo com o id, e isso calcula o 
             valor total
        DELETE: /api/v1/invoices/id: remova uma fatura de acordo com o id.
        
    Cabeçalho com token para clientes
        ```GET http://localhost:3000/api/v1/clientes HTTP/1.1
            token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZXN0YWRvIjp0cnVlLCJnb29nbGUiOmZhbHNlLCJfaWQiOiI1ZDBhNTIxZGNmOTBkMzVkY2NmNmI5MzciLCJub21icmUiOiJhZG1pbiIsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJfX3YiOjB9LCJpYXQiOjE1NjA5NjA4MjcsImV4cCI6MTU2MTEzMzYyN30.D5Cy8u0KXxKCrquJTl-TLJ9KFXuSfKh36z9XX9tSaC8
            cache-control: no-cache
            Postman-Token: 862b8bc3-adc2-400a-b2cf-b5b3bd384413
            User-Agent: PostmanRuntime/7.6.0
            Accept: */*
            Host: localhost:3000
            accept-encoding: gzip, deflate
            Connection: keep-alive```
    



## Iniciar no docker

para compilar no docker é necessário estar na raiz do projeto, onde está localizado
o package.json e execute os seguintes scommands:
     para criar a imagem em docker séria `docker image build --tag [nome da imagem] .`
     compilar com o docke-compose: `sudo docker-compose build`
     para iniciar e liberar o terminal: `'sudo docker-compose up -d`
     para iniciar e compilar se a imagem não é criada: `sudo docker-compose up --build`

Quando si é iniciado o docker, o sistema estará disponível nas portas:
     sistema `cloud computing api` a porta `3001`
     MongoDB puerti: `27017`
     mongo-express: `8081`

o sistema mongo-express, serve para gerenciar o banco de dados mongo,
É implementado com seu respectivo contêiner. Para acessar o usuário e senha é necessário:
`USERNAME: test`
`SENHA: teste!`

mongo-express é acessado como `'http://address:8081'` 
para acessar o sistema de computação em nuvem `'http://ipaddress:3001'`

a porta `27017` pertence a mongo

## Arquitetura / Design interno

   Nesta aplicação, o modelo de injeção de dependência foi implementado parafacilitar o desempenho de testes unitários. cada arquivo de endpoints tem testes de unidade<br>
   na pasta `/desing_diagram/doagrama de arquitectura -normal.pdf` é o diagrama que especifica o<br>
   Estrutura interna do sistema em que server.js depende de / server / routes / index, em cada arquivo de rota isento<br>
   `index.js` injeta dependências no` / server / endpoints / `desta forma é possível realizar testes de unidade em um<br>
   compreensível<br>
```
    server.js
    |
    /server
    |    |
    |    classes
    |    |    |
    |    |    factura.js
    |    |    facturas.spec.js
    |    |    index.js
    |    |
    |    config
    |    |    |
    |    |    api-ver.config.js
    |    |    config.js
    |    |
    |    endpoints
    |    |    |
    |    |   clients
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |    |
    |    |   invoices
    |    |    |    |
    |    |    |   index.js
    |    |    |   index.spec.js
    |    |   login
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |   cervices
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |   users
    |    |       |
    |    |       index.js
    |    |       index.spec.js
    |    |
    |    middlewares
    |    |    |
    |    |    authenticate.js
    |    |    authenticate.spec.js
    |    |    index.js
    |    |    
    |    models
    |    |    |
    |    |    clienteFactura.model.js
    |    |    clientes.model.js
    |    |    service.model.js
    |    |    usuario.model.js
    |    |
    |    routes
    |        |
    |        clients.js
    |        index.js
    |        index.test.js
    |        invoices.js
    |        login.js
    |        services.js
    |        users.js
    |
    .dockerignode
    |
    .gitignore
    |
    docker.compose.yml
    |
    Dockerfile
    |
    packaje.json
    |
    README.md
    |
    yarn.lock ```

    


## Español:

## Características
    nodejs: `11.4.0`
    yarn: `1.16.0`
    docker: `laster`
    docker-compose laste
Fue utilizado linux ubuntu-server 18.10 con docker
para compilar, correr generar container en docker,
para inicializar con docker composer.

fue utilizada la version de mongoDB: 4.0 
Nn el siguiente link estas los pasos a seguir para poder instalar mongoDB em windows:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
en linux:
https://docs.mongodb.com/manual/administration/install-on-linux/
en macOS:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/


## Instalar y Ejecutar 
Para iniciar la aplicacion es necesario descargar todas sus dependencias, ehecutado `yarn install`, es posible descargar las dependencias, para ejecutarla seria asi `node server` sera posible  




## Pruebas Unitarias y de Integracion
Para realizar test unitarios es necesario ejecutar el comando `yarn test`, si se desea ver con detalles ejecutar asi `yarn test --verbose`
si desea que los test esten con advice cuando tebga algun cambio en el codigo fuente: `yarn test --watchAll --verbose`, Para realizar los test junto con coverage ejecutar asi `yarn test --watchAll --verbose --coverage`



## Iniciar en docker 

para compilar en docker es necesario estar en la rais del proyevto,donde esta ubicado 
el package.json, y ejecutar los isguiente scomandos:
    para crear la image seria `docker image build --tag [nonbre de la image] .`
    para compilar con docke-compose: `sudo docker-compose build` 
    para iniciar y liberar la terminal: '`sudo docker-compose up -d`
    para Iniciar y compilar si no esta creada la imagen: `sudo docker-compose up --build`

Al inicar en docker, el sistema va a estar disponivlizando los puertos:
    sistema `cloud computing api` el puerto `3001`
    MongoDB puerti: `27017`
    mongo-express: `8081`

el sistema mongo-express, sirve para gerenciar la base de datos de mongo,
esta implementado con su respectivo container. para accesar a el es necesario usario y contraseña:
USERNAME: test
PASSWORD: test!

se accesa asi 'http://direccion:8081'
para accesar al sistema cloud-computing ''http://direccion:3001'

## Documentaciond de los Endpoints
Para la documentacion de los endopints, basta con  accesar esta relizada la documentacion de lsos endpoint.
https://documenter.getpostman.com/view/6153522/S1a32Shx

Fue usado Mongodb Para la base de datos docker, docker composer, 

## Documentacion de la api

API cloud_computin: la documentacion  de esta api se encuentra en el siguiente link:
https://documenter.getpostman.com/view/6153522/S1a32Shxse se encuentra documentado cada endpoint propuesto.

Fue implementado para test el token para clientes,
los enspoints de cliente, es necesario tener el token generado en login,
el token viaja por el header del Request con el nombre  token: 'valor del token' en 
este caso 'localhost' puede ser ip de un PC remoto;
http://localhost:3000/api/v1/clientes

donde: 'localhost:3000' 'localhost'  es la direccion ipn "3000" es el numero de puerto expuesto
       '/api' indica que es una api
       '/api/v1' indica la version de la api
       '/api/v1/{endpoints} es el enpoint de request  
                           puede ser: login, clientes, services,
                           usuarios, invoices
        
                           
 <a href='https://documenter.getpostman.com/view/6153522/S1a32Shx'>aqui</a>  esta espesificado
 la documentacion de cada uno de los endopints.
en la carpeta `/postman/test_computing_cloud.postman_collection.json` esta exportada  la configuracion de postman para el test manual de la aplicacion. 
puede inportar dicha configuracion en postman `File->import` luego esta listo para los test manuales.

endpoints:
    login:
        POST: login: por metodo 'POST' realiza login al sistema, generando token

    usuarios    
        GET: /api/v1/usuarios: Listar usuarios
        GET:/api/v1/usuarios/id: obtiene un unico usuario por medio de la id del mismo
        POST: /api/v1/usuarios: crea un usuario, si el email no existe
        PUT: /api/v1/usuario:/id: actualiza un usuario segun la id
        DELETE: /api/v1/usuario/id: Elimina un usuario segun la id
    
    clientes
        GET: /api/v1/clientes: listar clientes
        GET:/api/v1/clientes/id: obtiene un unico clientes por medio de la id del mismo
        POST: /api/v1/clientes: crea un clientes, si el email no existe
        PUT: /api/v1/clientes:/id: actualiza un clientes segun la id
        DELETE: /api/v1/clientes/id: Elimina un clientes segun la id
   
    services
        GET: /api/v1/services: listar services
        GET:/api/v1/services/id: obtiene un unico services por medio de la id del mismo
        POST: /api/v1/services: crea un services, si el email no existe
        PUT: /api/v1/services:/id: actualiza un services segun la id
        DELETE: /api/v1/services/id: Elimina un services segun la id

    facturas
        GET: /api/v1/invoices: listar todas las facturas esta paginado y
             por defecto tiene una pagina formada dese el elemento 0 hasta el elemnto 100
             esto puede ser configurado por parametros url `/api/v1/invoices?init=0&limit=100`
             donde `init` es el numero de inicio de la pagina y el limit es la cantidad de datos
             para la paginacion.
        GET: /api/v1/invoices/client/is: listar facturas de un cliente
        GET: /api/v1/invoices/id: obtiene un unica factura por medio de la id
        POST: /api/v1/invoices: crea una factura para un cliente, si este no tiene
                facturas abierta, en el caso contrario necesitara cerra la factura para poder 
                crear una nueva
        PUT: /api/v1/invoices:/id: actualiza un actualiza una factura, actualiza los servicios
        PUT: /api/v1/invoices:/closer/id: cierra una factura segun el id, y esta calcula el              valor total
        DELETE: /api/v1/invoices/id: Elimina una factura segun la id.

    header con token para clientes
    ```GET http://localhost:3000/api/v1/clientes HTTP/1.1
    token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZXN0YWRvIjp0cnVlLCJnb29nbGUiOmZhbHNlLCJfaWQiOiI1ZDBhNTIxZGNmOTBkMzVkY2NmNmI5MzciLCJub21icmUiOiJhZG1pbiIsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJfX3YiOjB9LCJpYXQiOjE1NjA5NjA4MjcsImV4cCI6MTU2MTEzMzYyN30.D5Cy8u0KXxKCrquJTl-TLJ9KFXuSfKh36z9XX9tSaC8
    cache-control: no-cache
    Postman-Token: 862b8bc3-adc2-400a-b2cf-b5b3bd384413
    User-Agent: PostmanRuntime/7.6.0
    Accept: */*
    Host: localhost:3000
    accept-encoding: gzip, deflate
    Connection: keep-alive```

## Arquitetura/Desing interno
    En esta aplicacion fue implemetado el modelo de inyeccion de dependencias para 
    facilitar la realizacion de los test unitarios. cada fichero de endpoint tiene test unitarios

    en la carpeta `/desing_diagram/doagrama de arquitectura-normal.pdf` esta el diagrama espesificando la 
    estructura interna del sistema  donde server.js depende de /server/routes/index, en cada archivo de routes exeptuado 
    `index.js` inyecta dependencias en los `/server/endpoints/` de esta forma es posible realizar test unitario de forma mas 
    entendible.

    server.js
    |
    /server
    |    |
    |    classes
    |    |    |
    |    |    factura.js
    |    |    facturas.spec.js
    |    |    index.js
    |    |
    |    config
    |    |    |
    |    |    api-ver.config.js
    |    |    config.js
    |    |
    |    endpoints
    |    |    |
    |    |   clients
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |    |
    |    |   invoices
    |    |    |    |
    |    |    |   index.js
    |    |    |   index.spec.js
    |    |   login
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |   cervices
    |    |    |    |
    |    |    |    index.js
    |    |    |    index.spec.js
    |    |   users
    |    |       |
    |    |       index.js
    |    |       index.spec.js
    |    |
    |    middlewares
    |    |    |
    |    |    authenticate.js
    |    |    authenticate.spec.js
    |    |    index.js
    |    |    
    |    models
    |    |    |
    |    |    clienteFactura.model.js
    |    |    clientes.model.js
    |    |    service.model.js
    |    |    usuario.model.js
    |    |
    |    routes
    |        |
    |        clients.js
    |        index.js
    |        index.test.js
    |        invoices.js
    |        login.js
    |        services.js
    |        users.js
    |
    .dockerignode
    |
    .gitignore
    |
    docker.compose.yml
    |
    Dockerfile
    |
    packaje.json
    |
    README.md
    |
    yarn.lock

    















