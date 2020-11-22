import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
} from "angular-in-memory-web-api";
import * as Rx from "rxjs";
import { Login } from "src/app/models/login";
import { Profile } from "src/app/models/profile";

@Injectable({
  providedIn: "root",
})
export class MockWebApi implements InMemoryDbService {
  createDb(): object {
    return {};
  }

  post(request: RequestInfo): object | void {
    const profile: Profile = {
      email: "user@example.com",
      name: "ringtail003",
      lastLogin: new Date("2020-12-02T10:15:00+0900"),
      avator:
        "https://avatars2.githubusercontent.com/u/15980747?s=460&u=4e89852f7e97d0bbac6f5345a823282de2f3e495&v=4",
    };

    const asHttpRequest = request.req as HttpRequest<Login>;

    switch (request.url) {
      case "/api/login":
        return asHttpRequest.body?.username === profile.name
          ? this.create200Response(profile, request)
          : this.create400Response(profile, request);

      case "/api/logout":
        return this.create200Response({}, request);
    }
  }

  create200Response(
    body: any,
    request: RequestInfo
  ): Rx.Observable<ResponseOptions> {
    return request.utils.createResponse$(() => {
      return {
        body,
        status: 200,
        statusText: "OK",
        headers: request.headers,
        url: request.url,
      };
    });
  }

  create400Response(
    body: any,
    request: RequestInfo
  ): Rx.Observable<ResponseOptions> {
    return request.utils.createResponse$(() => {
      return {
        body,
        status: 400,
        statusText: "Bad Request",
        headers: request.headers,
        url: request.url,
      };
    });
  }
}
