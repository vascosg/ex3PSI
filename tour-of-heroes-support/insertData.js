#! /usr/bin/env node

console.log(
  'Este script insere alguns heróis e pets de teste na sua base de dados. Especifique o banco de dados como argumento - exemplo: node insertData "mongodb+srv://usuário:senha@cluster0.mongodb.net/minha_base?retryWrites=true&w=majority"'
);

// Pega os argumentos passados na linha de comando
const userArgs = process.argv.slice(2);

const Hero = require("./models/hero");
const Pet = require("./models/pet");

const heroes = [];
const pets = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: Conectando ao banco de dados...");
  await mongoose.connect(mongoDB);
  console.log("Debug: Conexão bem-sucedida!");
  await createHeroes();
  await createPets();
  console.log("Debug: Fechando conexão com o banco de dados.");
  mongoose.connection.close();
}

// Função para criar heróis
async function heroCreate(index, name, pet) {
  const hero = new Hero({
    name: name,
    pet: pet,
  });

  await hero.save();
  heroes[index] = hero;
  console.log(`Herói criado: ${name}`);
}

// Função para criar pets
async function petCreate(index, name, hero) {
  const pet = new Pet({
    name: name,
    hero: hero,
  });

  await pet.save();
  pets[index] = pet;
  console.log(`Pet criado: ${name}`);
}

// Função para criar heróis
async function createHeroes() {
  console.log("Adicionando heróis...");
  await Promise.all([
    heroCreate(0, "Herói A", pets[0]),
    heroCreate(1, "Herói B", pets[1]),
    heroCreate(2, "Herói C", pets[2]),
  ]);
}

// Função para criar pets
async function createPets() {
  console.log("Adicionando pets...");
  await Promise.all([
    petCreate(0, "Pet 1", null), // Cria pet sem herói ainda
    petCreate(1, "Pet 2", null),
    petCreate(2, "Pet 3", null),
  ]);
}

