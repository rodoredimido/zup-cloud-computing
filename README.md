## INTALAR E EXECUTAR
È Para iniciar o aplicativo é necessário fazer o download de todas as suas dependências, rodar `yarn install`, é possível baixar as dependências, para executá-lo seria como 'servidor nó' seria possível

## Testes Unitarios
Para realizar testes unitários é necessário executar o comando `yarn test`, se quiser ver com detalhes execute` yarn test --verbose`
se quer que os testes escutando  quando você tem uma mudança no código fonte: `teste de fios --watchAll --verbose`, Para executar os testes junto com o teste de `coverage` execute` - watchAll --verbose --coverage`

## Documentação ENTPOINTS
https://documenter.getpostman.com/view/6153522/S1a32Shx

## Instalar y Ejecutar 
Para iniciar la aplicacion es necesario descargar todas sus dependencias, ehecutado `yarn install`, es posible descargar las dependencias, para ejecutarla seria asi `node server` sera posible  

## Pruebas Unitarias y de Integracion
Para realizar test unitarios es necesario ejecutar el comando `yarn test`, si se desea ver con detalles ejecutar asi `yarn test --verbose`
si desea que los test esten con advice cuando tebga algun cambio en el codigo fuente: `yarn test --watchAll --verbose`, Para realizar los test junto con coverage ejecutar asi `yarn test --watchAll --verbose --coverage`

## Documentaciond de los Endpoints
Para la documentacion de los endopints, basta con  accesar esta relizada la documentacion de lsos endpoint.
https://documenter.getpostman.com/view/6153522/S1a32Shx

Fue usado Mongodb Para la base de datos docker, docker composer, 


## Iniciar en docker 

para compilar en docker es necesario estar en la rais del proyevto,donde esta ubicado 
el package.json, y ejecutar los isguiente scomandos:
    para crear la image seria `docker image. build --tag [nonbre de la image] .`
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


## Documentacion de la api










