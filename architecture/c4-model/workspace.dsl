workspace {
    !adrs decisions
    model {
        customer = person "Chip Programmer" "Aspinity's customer"
        engineer = person "Aspinity Engineer"
        developer = person "System Developer" "Team ChipMonks"
        
        aspinitySimulator = softwareSystem "AML 100 Simulator" "A Python package"
        fileSystem = softwareSystem "File System" "The user's local file system"
        AML100 = element "AML100 - Aspinity's analog machine learning chip"
        analogMLConnect = softwareSystem "AnalogML Connect" "Aspinity's Development Platform" {
            
            group Clients {
            
                uiLayer = container "UI Layer"{

                    group ReactComponents {
                        reactComponent = component "Sample React Component" "UI Smart Component dealing with states and data"   
                    }

                    group Slices {
                        slice = component "Sample State Slice" "Responsible to update the store with new information"
                    }         

                    reduxStore = component "Redux store" "Storing all the state information"

                    remoteService = component "Remote Service" "Responsible for exchanging data with backend server"
                    remoteTransformer = component "Remote Transformer" "Responsible for transforming UI data to DTO and vice-versa"
                    remoteClient = component "Remote Client" "Interface for the Server API Calls happening to backend"
                    tauriApiClient = component "Tauri API Client" "Concrete Client having logic to call the backend server"
                    
                    storageService = component "Storage Service" "Responsible for exchanging data with storage"  
                    storageTransformer = component "Storage Transformer" "Responsible for transforming UI data to DTO and vice-versa"
                    storageClient = component "Storage Client" "Interface for the Storage API Calls happening to backend"
                    tauriFsClient = component "Tauri FS Client" "Concrete Client having logic to call the Local File System"

                    reactComponent -> reduxstore "uses"
                    reactComponent -> slice "uses"
                    reactComponent -> remoteService "uses"
                    reactComponent -> storageService "uses"

                    remoteService -> tauriApiClient "has"
                    remoteService -> remoteTransformer "has"
                    storageService -> tauriFsClient "has"
                    storageService -> storageTransformer "has"

                    tauriApiClient -> remoteClient "implements"
                    tauriFsClient -> storageClient "implements"

                    reduxStore -> slice "has"                 

                    customer -> reactComponent "Design customized networks"
                    reactComponent -> engineer "Receives customized network"
                    developer -> reactComponent "Maintains" 

                    tauriFsClient -> fileSystem "Writes/Reads Project Files"
                }

                cliapp = container "Command Line Application" {
                    customer -> this "Design customized networks"
                    this -> engineer "Receives customized network"
                    developer -> this "Maintains" 
                }

            }

            aspinity_wrapper = container "Aspinity Simulator Wrapper" "Compiled Python Executable" {
                
                wrapper_interface = component "Simulator Wrapper Interface" "Interface to be followed by Chip Pywrappers"
                python_wrapper = component "Simulator PyWrapper" "Python Module" 

                python_wrapper -> wrapper_interface "implements"

                
                //Container -> SoftwareSystem
                python_wrapper -> fileSystem "writes simulation result"
                python_wrapper -> aspinitySimulator "wraps"

                //SoftwareSystem -> Container
                aspinitySimulator -> python_wrapper "replies"
            }
            app_db = container "Application Database" {
                description "Responsible for storing application data"
                tags "DB"
            }
            ml_interepretor = container "Machine Learning Interpretor" {
                component "Training Manager"
                component "Data Visualizer"
            }
            
            appserver = container "Application Server" {
                datasetup = component "DataManager"
                elementmanager = component "ElementManager"
                projectmanager = component "ProjectManager"
                resultgenerator = component "ResultGenerator"
                filtermanager = component "FilterManager" "TBD - Does the simulator return a list of filters and their properties?"
                featurengineer = component "FeatureEngineer" "TBD - Are we managing neural network features seperately? Do they need to be stored?"
                uiController = component "UI Controller"
                cliController = component "CLI Controller"
                amlConnectCore = component "AML Connect Core"
                dbmanager = component "DBManager"
                audiomanager = component "AudioManager"
                mlinterpretor = component "MLInterpretor"
                networkmanager = component "NetworkManager"
                simulatorInterface = component "Network Simulator"


                //Internal Relations (Component -> Component)
                amlConnectCore -> networkmanager "has"
                amlConnectCore -> datasetup "has"
                amlConnectCore -> projectmanager "has"
                amlConnectCore -> audiomanager "has"
                amlConnectCore -> elementmanager "has"
                uiController -> amlConnectCore 
                cliController -> amlConnectCore
                networkmanager -> resultgenerator "uses"
                networkmanager -> filtermanager "uses"
                networkmanager -> dbmanager "uses"
                networkmanager -> featurengineer "uses"
                networkmanager -> mlinterpretor "uses"


                //Relations with external entitites

                //Component -> Component
                networkmanager -> python_wrapper "simulate network" "through sidecar"
                python_wrapper -> networkmanager "simulation results" "through file path"
                tauriApiClient -> uiController "makes calls to" "IPC-JSON"
                

                //Component -> Container
                dbmanager -> app_db "saves and retreives data"
            
                //Container -> Component
                cliapp -> cliController "calls" "bash commands"
                

                //Component -> Software System
                networkmanager -> aspinity_wrapper "Spawns new sidecar"
                elementmanager -> fileSystem "Retrieves Elements JSON"
                mlinterpretor -> ml_interepretor "calls" "IPC-JSON"

                //Software System -> Component
                ml_interepretor -> mlinterpretor "training logs"

            }
    
        }


        simulator = deploymentEnvironment "Simulator" {
            deploymentNode "User Laptop" {
                containerInstance uiLayer
                deploymentNode "Tauri backend" {
                    containerInstance appserver
                    deploymentNode "Embedded Sidecar" {
                        containerInstance aspinity_wrapper
                    }
                }
            }
        }

        engineer -> AML100 "Deploy network"
        engineer -> analogMLConnect "Upload Network Templates"


    }
    views {
        systemLandscape landscape {
            include *
            autolayout
        }

        systemContext analogMLConnect {
            include *
            autolayout lr
        }
        
        container analogMLConnect {
            include *
            autoLayout
        }

        component appserver {
            include *
            autolayout lr
        }

        component aspinity_wrapper {
            include *
            autoLayout
        }

        component ml_interepretor {
            include *
            autoLayout lr
        }

        component uiLayer {
            include *
            autoLayout
        }

        deployment * simulator {
            include *
            autoLayout lr
        }

        dynamic uiLayer {
            title "[Performance] Add Network Element"

            customer -> reactComponent "user request to add network element"
            reactComponent -> reduxStore "asks for metadata regarding network element"
            reduxStore -> reactComponent "data is received"
            reactComponent -> slice "user defined network is updated with the additional network element"
            reactComponent -> customer "new network element is displayed on canvas"
            
            autoLayout lr
        }

        dynamic appserver {
            title "Network Simulation From UI"


            reactComponent -> remoteService "Network JSON generated at UI"
            remoteService -> tauriApiClient "Transformed JSON that backend needs"
            tauriApiClient -> uiController "Network JSON"
            uiController -> amlConnectCore "Network JSON"
            amlConnectCore -> networkmanager "Network JSON for validation"
            networkmanager -> python_wrapper "Valid Network JSON"
            python_wrapper -> aspinitySimulator "Python Network Object"
            aspinitySimulator -> python_wrapper "Simulation Result"
            python_wrapper -> fileSystem "Persist Simulation Results"
            python_wrapper -> networkmanager "Simulation Results Path"

            autoLayout lr
        }

        theme default
    }
}