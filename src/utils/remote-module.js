import React, { Fragment, useState, Suspense } from "react";

const loadScope = (url, scope) => {
    // const element = document.createElement('script');
    const promise = new Promise(resolve => {
        // This part depends on how you plan on hosting and versioning your federated modules
        const remoteUrlWithVersion = url
        const script = document.createElement('script')
        script.src = remoteUrlWithVersion

        script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
                get: (request) => {
                    // Note the name of the module
                    return window[scope] != undefined ? window[scope].get(request) : Promise.resolve(false);
                },
                init: (arg) => {
                    try {
                        // Note the name of the module
                        return window[scope] != undefined ? window[scope].init(arg) : false
                    } catch (e) {
                        //  // console.log('remote container already initialized')
                    }
                }
            }
            resolve(proxy)
        }
        script.onerror = (error) => {
            const proxy = {
                get: (request) => {
                    // If the service is down it will render this content
                    return Promise.resolve(false);
                },
                init: (arg) => {
                    return;
                }
            }
            resolve(proxy)
        }
        // inject this script with the src set to the versioned remoteEntry.js
        document.head.appendChild(script);
    })
    // document.head.appendChild(element);
    return promise;
};

export async function loadModule(url, scope, module) {

    const container = await loadScope(url, scope);
    await __webpack_init_sharing__('default');
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    //  // console.log('asdads')

    //  // console.log(!factory)

    if (!factory) {
        return import('./error')
    }

    return factory();
}

