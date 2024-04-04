import { describe, it, expect } from "vitest";
import App from "@/App.vue";
import { mount } from '@vue/test-utils';
import json from '../json/data.json'

describe("App", () => {
    let emailList;

    const setup = () => {
        // Mock data
        // const json = [
        //     { id: 1, email: 'ann@timescale.com', isSelected: false },
        //     { id: 2, email: 'bob@timescale.com', isSelected: false },
        //     { id: 3, email: 'james@qwerty.com', isSelected: true },
        // ];

        // Mount the component
        emailList = mount(App, {
            data() {
                return {
                    availableRecipients: json,
                    selectedRecipients: {},
                    searchTerm: '',
                    searchResults: [],
                    available: {}
                }
            }
        });
    };

    it('renders email section', () => {
        setup(); // Execute setup logic before each test
        expect(emailList.find('.email-section').exists()).toBe(true);
    });

    it('renders available recipients list', () => {
        setup(); // Execute setup logic before each test
        expect(emailList.find('.available-recipients').exists()).toBe(true);
    });

    it('renders selected recipients list', () => {
        setup(); // Execute setup logic before each test
        expect(emailList.find('.selected-recipients').exists()).toBe(true);
    });
});
