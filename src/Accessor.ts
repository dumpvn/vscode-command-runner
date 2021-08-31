/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-08-16 10:34:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * load dependencies / import libraries
 *****************************************
 */
import * as vscode from 'vscode';
import variable from './helpers/variable';


/**
 *****************************************
 * variables
 *****************************************
 */
export const variableMap = {
    file: 1,
    fileBasename: 1,
    fileBasenameNoExtension: 1,
    fileDirname: 1,
    fileExtname: 1,
    lineNumber: 1,
    lineNumbers: 1,
    selectedText: 1,
    selectedTextList: 1,
    selectedTextSection: 1,
    selectedPosition: 1,
    selectedPositionList: 1,
    relativeFile: 1,
    workspaceFolder: 1,
    workspaceFolderBasename: 1,
    homedir: 1,
    tmpdir: 1,
    platform: 1,
};


/**
 *****************************************
 * variable type
 *****************************************
 */
export type VariableScope = keyof typeof variableMap;


/**
 *****************************************
 * Accessor
 *****************************************
 */
export default class Accessor {

    /* variable cache object */
    private $variable = variable();

    /* get environment variable */
    env(scope: string): string {
        return this.$variable.env()[scope.toUpperCase()] || '';
    }

    /* get configuration */
    config<T = unknown>(scope: string): T | undefined {
        return this.$variable.config().get(scope);
    }

    /* get package configuration */
    package<T = unknown>(scope: string): T | undefined {
        return this.$variable.package()[scope] as T;
    }

    /* get variables */
    variable(scope: VariableScope): string {
        return variableMap[scope] === 1 ? this.$variable[scope]() : '';
    }

    /* get command */
    command(name: string): string {
        return this.$variable.commands()[name] || name;
    }

    /* get command set */
    commands(): Record<string, string> {
        return this.$variable.commands();
    }

    /* get input */
    input(value: string): Thenable<string | undefined> {
        return vscode.window.showInputBox({ placeHolder: value && `default: "${value}"` });
    }
}
