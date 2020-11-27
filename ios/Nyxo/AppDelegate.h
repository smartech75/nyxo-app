
#import <UIKit/UIKit.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
#import <React/RCTBridgeDelegate.h>
#import "RNAppAuthAuthorizationFlowManager.h"
#import <UMCore/UMAppDelegateWrapper.h>
 
@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate, RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;
@property(nonatomic, strong) UIWindow *window;
@property(nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;

@end
