import { defineStore } from 'pinia'
import type { TemplateForm } from '../types/template'
import templatesData from '../data/templates.json'

export const useTemplateStore = defineStore('templates', {
    state: () => ({
        templates: templatesData as TemplateForm[],
    }),
    actions: {
        loadTemplates() {
            this.templates = templatesData as TemplateForm[];
        },
        getTemplateByCode(code: number) {
            return this.templates.find(template => template.code === code);
        },
        updateTemplate(template: TemplateForm) {
            const idx = this.templates.findIndex(t => t.code === template.code);
            if (idx !== -1) {
                this.templates[idx] = template;
            }
        },
        addTemplate(template: TemplateForm) {
           this.templates.push(template)
        },
        deleteTemplate(templateCode: number) {
            if (templateCode === 0) return

            this.templates = this.templates.filter(
                template => template.code !== templateCode
            );
        }
    }
})
