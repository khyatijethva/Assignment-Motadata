<script setup>
import json from './json/data.json'
</script>

<template>
  <div class="email-section">
    <div class="heading">
      <h1>Manage Email Addresses</h1>
    </div>

    <div class="recipient-lists">
      <div class="available-recipients">
        <div class="subhead">
          <h3>Available Recipients</h3>
        </div>
        <!-- search receipients code start here -->
        <div class="auto-search-complete">
          <input
            type="text"
            v-model="searchTerm"
            @input="searchRecipient"
            placeholder="Enter recipient name or email"
          />
          <ul v-if="searchResults.length" class="autosearch-list">
            <li v-for="(result, index) in searchResults" :key="index">
              {{ result.email }}
              <button @click="selectRecipient(result)">Select</button>
            </li>
          </ul>
        </div>
        <!-- search receipients code end here -->

        <!-- list of available receipient -->
        <ul>
          <li v-for="(recipient, index) in available" :key="index">
            {{ recipient.email }}
            <button @click="selectAvailable(recipient)">Select</button>
          </li>
        </ul>
        <!-- list of available receipient end here-->
      </div>

      <div class="selected-recipients">
        <div class="subhead">
          <h3>Selected Recipients</h3>
        </div>
        <!-- list of selected receipients -->
        <ul>
          <li v-for="(group, company) in selectedRecipients" :key="company">
            <div class="selected-group">
              <span>{{ company }}</span>
              <ul>
                <li v-for="(email, index) in group" :key="index">
                  {{ email.email }}
                  <button @click="removeRecipient(email)">Remove</button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- list of selected receipients end here-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableRecipients: [],
      selectedRecipients: {},
      searchTerm: '',
      searchResults: [],
      available: {}
    }
  },
  render() {},
  mounted() {
    // data json file is attached here
    this.availableRecipients = json
    this.updateSelectedRecipients()
    // console.log(available)
  },

  methods: {
    updateSelectedRecipients() {
      this.selectedRecipients = {}
      this.available = this.availableRecipients.filter((recipient) => !recipient.isSelected)
      this.availableRecipients.forEach((recipient) => {
        if (recipient.isSelected) {
          const domain = recipient.email.split('@')[1]
          if (!this.selectedRecipients[domain]) {
            this.selectedRecipients[domain] = []
          }
          this.selectedRecipients[domain].push(recipient)
        }
      })
      console.log(this.available)
    },
    selectAvailable(recipient) {
      recipient.isSelected = true
      this.updateSelectedRecipients()
    },
    removeRecipient(email) {
      email.isSelected = false
      this.updateSelectedRecipients()
    },

    // Search email logic for filtering
    searchRecipient() {
      this.searchResults = this.available.filter((recipient) =>
        recipient.email.includes(this.searchTerm)
      )
      if (this.searchTerm == '') {
        this.searchResults = ''
      }
      // console.log(this.searchResults)
    },
    selectRecipient(selected) {
      this.searchResults = ''
      this.searchTerm = ''
      selected.isSelected = true
      this.updateSelectedRecipients()
    }
  }
}
</script>
