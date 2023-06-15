workspace {

    model {
        customer = person "Chip Programmer" "Aspinity's customer"
        engineer = person "Aspinity Engineer" "usually Nick"
        developer = person "System Developer" "Team ChipMonks"
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
                filemanager = component "FileManager"
                resultgenerator = component "ResultGenerator"
                filtermanager = component "FilterManager" "TBD - Does the simulator return a list of filters and their properties?"
                featurengineer = component "FeatureEngineer" "TBD - Are we managing neural network features seperately? Do they need to be stored?"
                mainUI = component "Main UI"
                mainCLI = component "Main CLI"
                amlConnectCore = component "AML Connect Core"
                chipsimulator = component "ChipSimulator"
                dbmanager = component "DBManager"
                audiomanager = component "AudioManager"
                mlinterpretormod = component "MLInterpretor"
                networkmanager = component "NetworkManager"
                simulatorInterface = component "Simulator Interface"
                

                amlConnectCore -> networkmanager
                amlConnectCore -> datasetup
                amlConnectCore -> projectmanager
                amlConnectCore -> audiomanager
                projectmanager -> filemanager
                datasetup -> filemanager
                networkmanager -> resultgenerator
                networkmanager -> filtermanager
                networkmanager -> simulatorInterface
                networkmanager -> dbmanager
                networkmanager -> featurengineer
                networkmanager -> mlinterpretormod
                chipsimulator -> simulatorInterface "implements"
            }

            simulator = container "Simulator" {

            }

            app_db = container "Application Database" {
                description "Responsible for storing application data that does not pertain directly to the network. Details TBD"
                tags "DB"
            }

            cache = container "Cache" {
                description "focused on caching network files for fast retrieval. Details TBD."
            }

            filesystem = container "Local File System" {
                description "Responsible for storing audio files and test data"
                tags "DB"
            }

            ml_interepretor = container "Machine Learning Interpretor" {
                component "Training Manager"
                component "Data Visualizer"
            }
            chipsimulator -> simulator "calls" "TBD"
            mlinterpretormod -> ml_interepretor "calls" "IPC*"

            simulator -> chipsimulator "results" 
            ml_interepretor -> mlinterpretormod "training logs"

            
            filesystem -> filemanager "retrieve files" "Upload from local PC"
                
            cliapp -> mainCLI "calls via bash"
            tauriApiClient -> mainUI "makes calls to" "[IPC-JSON]"


            mainUI -> amlConnectCore 
            mainCLI -> amlConnectCore

            dbmanager -> app_db "saves and retreives data" "TBD"
            
            dbmanager -> cache "retrieves cached network config" "TBD"
            cache -> app_db "retrieves data" "TBD"

        }

        AML100 = element "AML100" "Aspinity's analog machine learning chip"
        engineer -> AML100 "Deploy network"
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
        }

        component appserver {
            include *
            autolayout lr
        }

        component uiLayer {
            include *
        }

        dynamic appserver {
            title "[Extensibility] Rust Simulator Swap"

            networkmanager -> simulatorInterface "passes user-defined network & audio data"
            networkmanager -> simulatorInterface "calls simulate_network()"
            simulatorInterface -> chipsimulator "calls chipSimulator implementation"
            chipsimulator -> simulator "translates data to simulator input data"
            simulator -> chipsimulator "sends back audio result"

            autoLayout lr
        }

        dynamic uiLayer {
            title "[Performance] Add Network Element"

            customer -> component1 "user request to add network element"
            component1 -> reduxStore "asks for metadata regarding network element"
            reduxStore -> component1 "data is received"
            component1 -> slice1 "user defined network is updated with the additional network element"
            component1 -> customer "new network element is displayed on canvas"
            
            autoLayout lr
        }
        
        theme default
    }
}