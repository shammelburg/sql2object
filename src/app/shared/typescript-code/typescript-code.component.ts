import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typescript-code',
  templateUrl: './typescript-code.component.html',
  styleUrls: ['./typescript-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypescriptCodeComponent implements OnInit {

  @Input()
  props: any = []

  constructor() { }

  ngOnInit(): void {
  }

}