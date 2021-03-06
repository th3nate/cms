import {Injectable, Inject} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UtilitiesService {
    constructor(@Inject('Window') private window: Window) {
    }

    getApiUrl() {
        const port = this.getPort();
        if (environment.production) {
            return `${environment.baseUrl}`;
        }
        return `${environment.baseUrl}${port}`;
    }

    private getPort() {
        const port = this.window.location.port;
        if (port) {
            // for running with Azure Functions local emulator
            if (port === '4200') {
                // Local run with 'npm run' also started in api folder for Azure Functions
                return ':7071'; // for debugging Azure Functions locally
            }
            // Running with local node (which serves Angular and the API)
            return ':' + this.window.location.port;
        } else {
            // for running locally with Docker/Kubernetes
            if (this.window.location.hostname === 'localhost') {
                return ':8080';
            }
        }
        return '';
    }
}