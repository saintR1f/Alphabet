<template>
  <div>
    <div v-for="item in letters" :key="item.id">
      <h2>{{ item.letter }}</h2>
      <textarea
          @keydown.enter.prevent="handleEnter(item)"
          v-model="item.content"
          placeholder="Введите слово на эту букву"
          name=""
          id=""
          rows="4"
      >
      </textarea>
    </div>
  </div>
  <div></div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from 'vue'

interface ILetter {
  id: number
  letter: string
  content?: string
  isCorrect?: boolean
}

export default defineComponent({
  data() {
    return {
      letters: [] as ILetter[],
    }
  },
  created() {
    this.initializeAlphabet()
  },
  methods: {
    initializeAlphabet() {
      const lettersStr: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
      this.letters = lettersStr.split('').map((letter, index) => ({
        id: index + 1,
        letter: letter,
      }))
    },
    checkWordsFirstLetters(content: string, letter: string) {
      var words: string[]
      var wordIndex = 1
      words = content.split(' ')
      for (const word of words) {
        if (word && word.length > 0) {
          if (word.toLowerCase().startsWith(letter.toLowerCase())) {
            wordIndex++
          } else {
            alert(`Неверное слово ${wordIndex}, напиши правильное слово на букву ${letter}`)
          }
        }
        {
        }
      }
    },
    handleEnter(item: ILetter) {
      if (item.content) {
        this.checkWordsFirstLetters(item.content, item.letter)
      }
    },
  },
})
</script>