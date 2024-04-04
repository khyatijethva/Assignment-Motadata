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
        <!-- Search the Receipient from available receipient code -->
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
        <!-- Search the Receipient from available receipient code end -->

        <!-- List of available recipient code -->
        <ul>
          <li class="form-check" v-for="selector in available" :key="selector.id">
            <label class="form-check-label" :for="selector.email">
              <input
                type="checkbox"
                :id="selector.email"
                :value="selector.email"
                @click.prevent="selectAvailable(selector)"
              />
              {{ selector.email }}
            </label>
          </li>
        </ul>
        <!-- List of available recipient code end here-->
      </div>

      <div class="selected-recipients">
        <div class="subhead">
          <h3>Selected Recipients</h3>
        </div>

        <!-- List of selected recipients code -->
        <ul>
          <li v-for="(group, company) in selectedRecipients" :key="company">
            <div class="selected-group">
              <span class="company-name">{{ company }}</span>
              <ul>
                <li class="form-check" v-for="remover in group" :key="remover.id">
                  <label class="form-check-label" :for="remover.id">
                    <input
                      type="checkbox"
                      :id="remover.id"
                      :value="remover.email"
                      @click.prevent="removeRecipient(remover)"
                      checked
                    />
                    {{ remover.email }}
                  </label>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- List of selected recipients code end here-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableRecipients: [], // Array to store available recipients
      selectedRecipients: {}, // Object to store selected recipients grouped by company
      searchTerm: '', // Search term for filtering recipients
      searchResults: [], // Results of search
      available: {} // Object to store available recipients (filtered by search and selection)
    }
  },
  mounted() {
    // Fetch data from JSON file
    this.availableRecipients = json
    // Initialize selected recipients
    this.updateSelectedRecipients()
  },

  methods: {
    // Update the list of selected recipients
    updateSelectedRecipients() {
      this.selectedRecipients = {}
      // Filter available recipients to get only those which are not selected
      this.available = this.availableRecipients.filter((recipient) => !recipient.isSelected)
      // Group selected recipients by their domain name
      this.availableRecipients.forEach((recipient) => {
        if (recipient.isSelected) {
          const domain = recipient.email.split('@')[1] // Splitting receipient email to get domain
          if (!this.selectedRecipients[domain]) {
            this.selectedRecipients[domain] = []
          }
          this.selectedRecipients[domain].push(recipient)
        }
      })
    },

    // Select an available recipient
    selectAvailable(selector) {
      selector.isSelected = true
      this.updateSelectedRecipients()
    },

    // Remove a selected recipient
    removeRecipient(remover) {
      remover.isSelected = false
      this.updateSelectedRecipients()
    },

    // Search email logic for filtering
    searchRecipient() {
      this.searchResults = this.available.filter((recipient) =>
        recipient.email.includes(this.searchTerm)
      )
      // Reset search results if search term is empty
      if (this.searchTerm == '') {
        this.searchResults = ''
      }
    },

    // Select a recipient from search results
    selectRecipient(selected) {
      this.searchResults = ''
      this.searchTerm = ''
      selected.isSelected = true
      this.updateSelectedRecipients()
    }
  }
}
</script>
