// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { default as axios } from "axios";
import { DownloadException } from "../exceptions";

import * as utils from "./common";

export async function downloadByUrl(url: string): Promise<Buffer> {
    let res = undefined;
    try {
        res = await axios.get(url, {
            responseType: "arraybuffer",
        });
    } catch (e) {
        throw new DownloadException(url, e);
    }

    if (!res || !utils.isHttpCodeOkOrCreated(res.status)) {
        throw new DownloadException(url);
    }

    return res.data;
}
