import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})

export class TemplatePageComponent implements OnInit {
  public items: Array<{ id: string, name: string, description1?: string, description2?: string }> = [
    {
      id: '1',
      name: 'Template Name 1',
      description1: "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
      description2: "Did you enclose a technical scheme?"
    },
    {
      id: '2',
      name: 'Template Name 2',
      description1: "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
      description2: "Did you enclose a technical scheme?"
    },
    {
      id: '3',
      name: 'Template Name 3',
      description1: "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
      description2: "Did you enclose a technical scheme?"
    },
    {
      id: '4',
      name: 'Template Name 4',
      description1: "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
      description2: "Did you enclose a technical scheme?"
    },
    {
      id: '5',
      name: 'Template Name 5',
      description1: "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
      description2: "Did you enclose a technical scheme?"
    }
  ];
  constructor() { }

  ngOnInit() { }
}
