workspace {

    model {
        customer = person "Chip Programmer" "Aspinity's customer"
        engineer = person "Aspinity Engineer" "usually Nick"
        developer = person "System Developer" "Team ChipMonks"
        filemanager = softwareSystem "File System" "The user's local file system"
        astrl = softwareSystem "Aspinity Development Platform" {
            
            group Clients {
                
                uiLayer = container "UI Layer"{
                    group ReactComponents {
                        component1 = component "Sample React Component"    
                    }

                    group Slices {
                        slice1 = component "Sample Slice"
                    }         

                    reduxStore = component "Redux store"

                    apiInterface = component "API Interface"
                    apiTransformer = component "API Transformer" "Converts state to DTO object"
                    tauriApiClient = component "Tauri API Client"
                    restAPIClient = component "REST API Client"

                    component1 -> reduxstore "uses"
                    component1 -> slice1 "uses"
                    component1 -> apiInterface "uses"
                    component1 -> apiTransformer "uses"
                    tauriApiClient -> apiInterface "implements"
                    restAPIClient -> apiInterface "implements"

                    reduxStore -> slice1 "has"                 

                    customer -> component1 "Design customized networks"
                    component1 -> engineer "Receives customized network"
                    developer -> component1 "Maintains" 
                }

                cliapp = container "Command Line Application" {
                    customer -> this "Design customized networks"
                    this -> engineer "Receives customized network"
                    developer -> this "Maintains" 
                }

            }

            appserver = container "Application Layer" {
                datasetup = component "DataManager"
                projectmanager = component "ProjectManager"
                resultgenerator = component "ResultGenerator"
                filtermanager = component "FilterManager" "TBD - Does the simulator return a list of filters and their properties?"
                featurengineer = component "FeatureEngineer" "TBD - Are we managing neural network features seperately? Do they need to be stored?"
                UIController = component "UI Controller"
                CLIController = component "CLI Controller"
                amlConnectCore = component "AML Connect Core"
                chipsimulator = component "AML 100 Simulator"
                dbmanager = component "DBManager"
                audiomanager = component "AudioManager"
                mlinterpretormod = component "MLInterpretor"
                networkmanager = component "NetworkManager"
                simulatorInterface = component "Network Simulator"
                
                amlConnectCore -> networkmanager
                amlConnectCore -> datasetup
                amlConnectCore -> projectmanager
                amlConnectCore -> audiomanager
                projectmanager -> filemanager
                networkmanager -> resultgenerator
                networkmanager -> filtermanager
                networkmanager -> simulatorInterface
                networkmanager -> dbmanager
                networkmanager -> featurengineer
                networkmanager -> mlinterpretormod
                chipsimulator -> simulatorInterface "implements"
                
                datasetup -> filemanager "retrieve files" "Upload from local PC"
            }

            app_db = container "Application Database" {
                description "Responsible for storing application data that does not pertain directly to the network. Details TBD"
                tags "DB"
            }

            cache = container "Cache" {
                description "focused on caching network files for fast retrieval. Details TBD."
            }

            ml_interepretor = container "Machine Learning Interpretor" {
                component "Training Manager"
                component "Data Visualizer"
            }
            mlinterpretormod -> ml_interepretor "calls" "IPC*"
            
            ml_interepretor -> mlinterpretormod "training logs"

            cliapp -> CLIController "calls" "bash commands"
            tauriApiClient -> UIController "makes calls to" "IPC-JSON"

            UIController -> amlConnectCore 
            CLIController -> amlConnectCore

            dbmanager -> app_db "saves and retreives data" "TBD"
            
            dbmanager -> cache "retrieves cached network config" "TBD"
            cache -> app_db "retrieves data" "TBD"

        }
        simulator_crate = softwareSystem "Simulator Crate" {
            python_binary = container "Compiled Python Interpretor"
            aspinity_simulator = container "Aspinity AML100 simulator"
            python_app = container "Python CLI Application"
            python_app -> aspinity_simulator "Uses"
            python_app -> python_binary "Runs using"
            aspinity_simulator -> python_binary "Runs using"
        }
        
        chipSimulator -> simulator_crate "Spawns new sidecar"
        chipsimulator -> python_app "async call" "bash commands"
        python_app -> chipsimulator "results" 
        
        simulator = deploymentEnvironment "Simulator" {
            deploymentNode "User Laptop" {
                containerInstance uiLayer
                deploymentNode "Tauri backend" {
                    containerInstance appserver
                    deploymentNode "Embedded Sidecar" {
                        containerInstance python_app
                        containerInstance python_binary
                        containerInstance aspinity_simulator
                    }
                }
            }
        }

        AML100 = element "AML100ntainernity's analog machine learning chip"
        engineer -> AML100 "Deploy network"

        appserver -> simulator_crate

    }
    views {
        systemLandscape landscape {
            include *
            autolayout lr
        }

        systemContext astrl {
            include *
            autolayout 
        }
        
        container astrl {
            include *
            autoLayout
        }

        component appserver {
            include *
            autolayout lr
        }

        component uiLayer {
            include *
            autoLayout
        }

        deployment * simulator {
            include *
            autoLayout lr
        }

        dynamic appserver {
            title "[Extensibility] Rust Simulator Swap"

            networkmanager -> simulatorInterface "passes user-defined network & audio data"
            networkmanager -> simulatorInterface "calls simulate_network()"
            simulatorInterface -> chipsimulator "calls chipSimulator implementation"
            chipsimulator -> simulator_crate "translates data to simulator input data"
            simulator_crate -> chipsimulator "sends back audio result"

            autoLayout lr
        }

        dynamic appserver {
            title "[Performance] Add Network Element"

            uiLayer -> UIController "add network element"
            UIController -> amlConnectCore
            amlConnectCore -> networkmanager
            networkmanager -> dbmanager
            networkmanager -> featurengineer
            dbmanager -> cache
            dbmanager -> app_db
            cache -> app_db
            
            autoLayout lr
        }
        
        theme default
    }
}