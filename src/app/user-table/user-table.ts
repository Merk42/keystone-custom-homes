import { Component, Injector, effect, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LruCacheService } from '../lrucache';
import { User } from '../types';

@Component({
  selector: 'kch-user-table',
  imports: [FormsModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})

export class UserTable {
  users = ['Bobson Dugnutt', 'Sleve McDichael', 'Willie Dustice', 'Todd Bonzalez', 'Mike Truk', 'Dwigt Rortugal', 'Tony Smehrik', 'Rey McSriff'];
  endpoints = ['/api/users', '/api/homes', '/api/schools', '/api/states', '/api/cities', '/api/counties'];
  autoOn = signal<boolean>(false);
  tableInfo = signal<any[]>([]);
  size = model<number>(4);
  cardLayout = signal<boolean>(false)

  private intervalId: any
  private dataCache: LruCacheService<string, User>;

  constructor() {
    this.dataCache = new LruCacheService<string, User>(this.size());
    effect((onCleanup) => {
      const active = this.autoOn();

      if (active) {
        this.intervalId = setInterval(() => {
          this.mockAPIhit()
        }, 1000);
        onCleanup(() => {
          clearInterval(this.intervalId);
        });
      } else {
        clearInterval(this.intervalId); // Clear if the signal becomes inactive
      }
    }, { injector: inject(Injector) });
    effect(() => {
      this.dataCache = new LruCacheService<string, User>(this.size());
    })
  }

  mockData(): {name: string, endpoint: string} {
    const name = this.users[Math.floor(Math.random() * this.users.length)];
    const endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    return { name, endpoint };
  };

  processNewData(name: string, endpoint: string):void {
    let userStats = this.dataCache.get(name);
    if (!userStats) {
      userStats = {
        name: name,
        endpoints: new Map([[endpoint, 1]]),
        endpoint: endpoint,
        hits: 1
      };
    } else {
        const endpointHits = (userStats.endpoints.get(endpoint) || 0) + 1;
        userStats.endpoints.set(endpoint, endpointHits);
        if (endpointHits > userStats.hits) {
          userStats.endpoint = endpoint;
          userStats.hits = endpointHits;
        }
    }
    this.dataCache.put(name, userStats);
    this.tableInfo.set(this.computedDisplay())
  }

  mockAPIhit():void {
    const { name, endpoint } = this.mockData();
    console.log('mock', name, endpoint)
    this.processNewData(name, endpoint);
  };

  computedDisplay():User[] {
    return Array.from(this.dataCache.values()).sort((a, b) => b.hits - a.hits)
  }

  toggleAuto():void {
    this.autoOn.set(!this.autoOn())
  }
}
