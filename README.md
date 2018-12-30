# Lackey 
> Lackey is still under development

Lackey is a node js helper to make command line apps easier and cleaner

**Installation**

    npm install cli-lackey
    npm link

**Create new command**

    lackey create:command CommandName --dir='path to be saved'

**Register new command**

> create a file called commands.js in your project root dir
with content:

    const Command1 = require('path to Command1.js')
    module.exports = [
	    new Command1
    ]
**Calling a command**

 - without arguments `lackey command1`
 - with arguments `lackey command1 arg1value`
 - with options `lackey command1 arg1value --option1=option1value`
 - help `lackey command1 --help`

**or you can create a Command1.js file with this content**:

        const {Command} = require('cli-lackey')
        
	    class Command1 extends Command {
		    config () {
			    return {
				    signature: 'command1 {arg1} {--option1}'
				}
			}
			
			handle () {
				// your code here
				console.log(this.input.getArg('arg1'))
				console.log(this.input.getOption('option1'))
			}
		}
    
	    module.exports = Command1

**Create a Generator Command**

    const {GeneratorCommand} = require('cli-lackey')
    
    class Generator1 extends GeneratorCommand {
    
        config () {
            return {
                signature: 'generate {name} {--dir}'
                // you can use ! to make an option required
                // or ? to make an argument optional
                // {name?} is optional arg
                // {--dir!} is required option
            }
        } 
    
        getTemplate () {
            return 'path to your template file'
        }
    
        getReplacements () {
            return {
	            name: this.input.getArg('name')
            }
        }
    
        getPath () {
            return this.input.getOption('dir')
        }
    }
    
    module.exports = Generator1

A template file could be any file with content to be replaced for example:

    this is a template with name <name>

In this example if we run `lackey generate ABC --dir=/tmp/abc.txt`

we will have a file with this content:

    this is a template with name ABC

**Config function**

config function should return an object with:
|config key|config value |
|--|--|
| signature | [required] the signature of the command as `command-name {arg1} {arg2} {--option1}` |
|help|[optional] Is an object that define every option as `{dir: 'Directory to save...'}`|
|description|[optional] Description of the command itselfe|
|alias|[optional] Alias to call the command with |

example of the command generator command:

    config () {
		return {
			signature: 'create:command {name} {--dir!}',
			help: {
			    dir: 'Directory of the file'
			},
			description: 'Creates a command file',
			alias: 'c:c'
		}
	}

