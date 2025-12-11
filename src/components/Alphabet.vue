<template>
  <div class="grid-list">
    <div
      class="grid-letter"
      v-for="item in letters"
      :key="item.id"
      :class="[item.isActive ? '' : 'passive']"
    >
      <h2>{{ item.letter.toUpperCase() }}</h2>
      <textarea
        :readonly="!item.isActive"
        id="textform"
        @keydown.enter.prevent="handleEnter(item)"
        @mouseleave.prevent="handleEnter(item)"
        v-model="item.content"
        placeholder="Введите слово на эту букву"
        rows="4"
      >
      </textarea>
    </div>
  </div>
  <div></div>
</template>

<style src="./alphabet.scss" lang="scss"></style>

<script lang="ts">
import { defineComponent } from 'vue'

interface ILetter {
  id: number
  letter: string
  content?: string
  isActive?: boolean
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
      const lettersStr: string = 'абвгдеёжзийклмнопрстуфхцчшщэюя'
      this.letters = lettersStr.split('').map((letter, index) => ({
        id: index + 1,
        letter: letter,
        isActive: true,
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
            return 0
          }
          if (wordIndex - 1 == words.length) {
            return 1
          }
        }
      }
    },

    handleEnter(item: ILetter) {
      if (item.content) {
        console.log('fuck')
        if (this.checkWordsFirstLetters(item.content, item.letter)) {
          item.isActive = false
        }
      }
    },
  },
})
</script>
