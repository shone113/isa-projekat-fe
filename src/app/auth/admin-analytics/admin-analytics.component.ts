import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadialChartComponent } from '../radial-chart/radial-chart.component';
import { SplineChartComponent } from '../spline-chart/spline-chart.component';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [
    CommonModule,
    RadialChartComponent,
    SplineChartComponent
  ],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent {

  selectedCategory: string | null = null;
  postsOptions: boolean = false;
  commentsOptions: boolean = false;
  usersOptions: boolean = false;
  radialChart: boolean = false;
  splineChart: boolean = false;

  selectedSection: string = '';
  selectedTimeSpan: string = '';
  radialGraphType: string = '';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  showPostsOptions(){
    this.postsOptions = !this.postsOptions;
  }

  showCommentsOptions(){
    this.commentsOptions = !this.commentsOptions;
  }

  showUsersOptions(){
    this.usersOptions = !this.usersOptions;
  }
  selectGraph(section: string, timeSpan: string) {
    this.selectedSection = section;
    this.selectedTimeSpan = timeSpan;
    this.radialChart = false;
    this.splineChart = true;
  }
  selectRadialGraph(graph: string){
    this.splineChart = false;
    this.radialChart = true;
    this.radialGraphType = graph;
  }
}
