const fs = require('fs')
const faker = require('faker')

faker.locale = 'ru'

const getPerson = id => {
  return { id, name: faker.name.findName() }
}

const getPost = (id, person) => {
  const textPreview = faker.lorem.paragraphs()
  return {
    id,
    person_id: person.id,
    person_name: person.name,
    title: faker.lorem.sentences(),
    post:
      textPreview +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs() +
      faker.lorem.paragraphs(),
    textPreview,
    created_at: faker.date.recent()
  }
}

const getRandomInt = max => {
  return Math.floor(Math.random() * max) + 1
}

const numberOfPerson = 20
const maxfPosts = 15
const persons = []
const posts = []

let postIndex = 1

for (let i = 1; i <= numberOfPerson; i++) {
  const numberOfPosts = getRandomInt(maxfPosts)
  let person = getPerson(i)
  persons.push(person)
  for (let j = 1; j <= numberOfPosts; j++) {
    let post = getPost(postIndex, person)
    posts.push(post)

    postIndex++
  }
}
const db = { persons, posts }
fs.writeFile('./data/db.json', JSON.stringify(db, null, 2), er => {
  if (er) throw er
  console.log('succsessfully')
})
